import { DateTime } from 'luxon';
import { IOError } from './IOError';
import { createIO } from '../io/createIO';
import type { ActionRoute } from '../shared/types/ActionRoute';
import type { RunParams } from '../shared/types/RunParams';
import type { RunState } from '../shared/types/RunState';
import type { SessionUser } from '../shared/types/SessionUser';
import type { StepComponent } from '../shared/types/StepComponent';
import type { StepResponse } from '../shared/types/StepResponse';
import { actionHref } from '../shared/utils/actionHref';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { PendingStep } from '../types/PendingStep';
import type { RegisteredAction } from '../types/RegisteredAction';
import type { RunListener } from '../types/RunListener';
import type { RunRespondResult } from '../types/RunRespondResult';
import type { StepCheck } from '../types/StepCheck';
import type { StepCheckResult } from '../types/StepCheckResult';
import { parseResponseValues } from '../utils/parseResponseValues';
import { toActionResult } from '../utils/toActionResult';
import { toFailureResult } from '../utils/toFailureResult';

export type RunOptions = {
  id: string;
  action: RegisteredAction;
  user: SessionUser;
  // The query string as it came, kept in the state for "Run again".
  params: RunParams;
  // What the handler gets as ctx.params: the query string parsed by the action's params schema.
  ctxParams?: unknown;
  registry: ComponentRegistry;
};

type ShowErrorsArgs = StepCheckResult & {
  pending: PendingStep;
};

// One run of an action. The handler runs as a normal async function; every awaited io call parks it on a
// promise stored in `pending` until the browser answers through respond().
export class Run {
  readonly id: string;
  // Only this user can follow, answer and cancel the run.
  readonly user: SessionUser;
  private readonly ctxParams: unknown;
  private readonly action: RegisteredAction;
  private readonly registry: ComponentRegistry;
  private readonly listeners = new Set<RunListener>();
  private state: RunState;
  private pending: PendingStep | null = null;
  private finishedAt: DateTime | null = null;
  private stepCount = 0;

  constructor({ id, action, user, params, ctxParams = params, registry }: RunOptions) {
    this.id = id;
    this.user = user;
    this.ctxParams = ctxParams;
    this.action = action;
    this.registry = registry;
    this.state = { id, actionSlug: action.slug, actionName: action.name, params, version: 0, status: 'RUNNING', step: null, loading: null, result: null, redirect: null, finishedAt: null };
  }

  get current() {
    return this.state;
  }

  get subscriberCount() {
    return this.listeners.size;
  }

  get finishedTime() {
    return this.finishedAt;
  }

  async execute() {
    try {
      const value = await this.action.handler({
        io: createIO({
          registry: this.registry,
          render: (components, check) => {
            return this.render(components, check);
          },
        }),
        ctx: {
          runId: this.id,
          action: { slug: this.action.slug },
          params: this.ctxParams,
          user: this.user,
          loading: {
            start: ({ label, description, itemsInQueue }) => {
              if (this.state.status === 'RUNNING') {
                this.update({ loading: { label, description: description ?? null, itemsInQueue: itemsInQueue ?? null, itemsCompleted: 0 } });
              }
            },
            update: ({ label, description, itemsInQueue }) => {
              const { loading } = this.state;

              if (this.state.status !== 'RUNNING') {
                return;
              }

              this.update({
                loading: {
                  label: label ?? loading?.label ?? 'Running…',
                  description: description ?? loading?.description ?? null,
                  itemsInQueue: itemsInQueue ?? loading?.itemsInQueue ?? null,
                  itemsCompleted: loading?.itemsCompleted ?? 0,
                },
              });
            },
            completeAll: () => {
              const { loading } = this.state;

              if (this.state.status === 'RUNNING' && loading?.itemsInQueue) {
                this.update({ loading: { ...loading, itemsCompleted: loading.itemsInQueue } });
              }
            },
            completeOne: () => {
              const { loading } = this.state;

              if (this.state.status === 'RUNNING' && loading?.itemsInQueue) {
                this.update({ loading: { ...loading, itemsCompleted: Math.min(loading.itemsCompleted + 1, loading.itemsInQueue) } });
              }
            },
          },
          redirect: (route) => {
            this.redirect(route);

            return Promise.resolve();
          },
        },
      });

      this.finish(toActionResult({ value }));
    } catch (error) {
      this.finish(toFailureResult({ error }));
    }
  }

  // Sends the current state right away, so a page that (re)connects never waits for the next change.
  subscribe(listener: RunListener) {
    this.listeners.add(listener);
    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  // Async because the handler's own checks (.validate()) may look things up before the step is accepted.
  async respond({ stepId, values }: StepResponse): Promise<RunRespondResult> {
    if (this.state.status !== 'RUNNING') {
      return { status: 'RUN_CLOSED' };
    }

    const pending = this.pending;

    if (!pending || pending.stepId !== stepId) {
      return { status: 'STALE_STEP' };
    }

    const parsed = parseResponseValues({ registry: this.registry, components: pending.components, values });

    if (parsed.status === 'INVALID') {
      return this.showErrors({ pending, errors: parsed.errors, message: parsed.message });
    }

    try {
      const checked = await pending.check?.(parsed.values);

      // While the check ran, the run may have been canceled or the step answered by another request.
      if (this.pending !== pending) {
        return this.state.status === 'RUNNING' ? { status: 'STALE_STEP' } : { status: 'RUN_CLOSED' };
      }

      if (
        checked &&
        (checked.message !== null ||
          checked.errors.some((error) => {
            return error !== null;
          }))
      ) {
        return this.showErrors({ pending, errors: checked.errors, message: checked.message });
      }
    } catch (error) {
      // A check that throws fails the run like the handler throwing at its await.
      if (this.pending === pending) {
        this.pending = null;
        pending.reject(error);
      }

      return { status: 'OK' };
    }

    this.pending = null;
    this.update({ step: null });
    pending.resolve(parsed.values);

    return { status: 'OK' };
  }

  cancel() {
    if (this.state.status !== 'RUNNING') {
      return;
    }

    const pending = this.pending;
    this.pending = null;
    this.finishedAt = DateTime.now();
    this.update({ status: 'CANCELED', step: null, loading: null, result: null, finishedAt: this.finishedAt.toISO() });
    pending?.reject(new IOError('CANCELED'));
  }

  // Same step again with the problems under their fields. The form keeps what the user typed, it is keyed by stepId.
  private showErrors({ pending, errors, message }: ShowErrorsArgs): RunRespondResult {
    this.update({ step: { ...pending.step, errors, message } });

    return {
      status: 'VALIDATION_ERROR',
      message:
        message ??
        errors.find((error) => {
          return error !== null;
        }) ??
        'Invalid values.',
    };
  }

  private render(components: StepComponent[], check?: StepCheck) {
    if (this.state.status !== 'RUNNING') {
      // A handler that keeps working after a cancel learns why at its next io call.
      return Promise.reject(new IOError(this.state.status === 'CANCELED' ? 'CANCELED' : 'RUN_CLOSED'));
    }

    if (this.pending) {
      return Promise.reject(new IOError('STEP_IN_PROGRESS'));
    }

    return new Promise<unknown[]>((resolve, reject) => {
      this.stepCount += 1;
      const step = {
        stepId: crypto.randomUUID(),
        index: this.stepCount,
        components,
        errors: components.map(() => {
          return null;
        }),
        message: null,
      };
      this.pending = { stepId: step.stepId, components, step, check, resolve, reject };
      this.update({ step, loading: null });
    });
  }

  // Like a finish, but the browser opens the given action instead of showing a result.
  private redirect(route: ActionRoute) {
    if (this.state.status !== 'RUNNING') {
      return;
    }

    const pending = this.pending;
    this.pending = null;
    this.finishedAt = DateTime.now();
    this.update({ status: 'REDIRECTED', step: null, loading: null, result: null, redirect: actionHref(route), finishedAt: this.finishedAt.toISO() });
    pending?.reject(new IOError('RUN_CLOSED'));
  }

  // A canceled run already published its final state; whatever the handler does afterwards is ignored.
  private finish(result: NonNullable<RunState['result']>) {
    if (this.state.status !== 'RUNNING') {
      return;
    }

    this.pending = null;
    this.finishedAt = DateTime.now();
    this.update({ status: result.status, step: null, loading: null, result, finishedAt: this.finishedAt.toISO() });
  }

  private update(changes: Partial<Pick<RunState, 'status' | 'step' | 'loading' | 'result' | 'redirect' | 'finishedAt'>>) {
    this.state = { ...this.state, ...changes, version: this.state.version + 1 };

    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }
}
