import { DateTime } from 'luxon';
import { IOError } from './IOError';
import { createIO } from '../io/createIO';
import type { RunState } from '../shared/types/RunState';
import type { StepComponent } from '../shared/types/StepComponent';
import type { StepResponse } from '../shared/types/StepResponse';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { PendingStep } from '../types/PendingStep';
import type { RegisteredAction } from '../types/RegisteredAction';
import type { RunListener } from '../types/RunListener';
import type { RunRespondResult } from '../types/RunRespondResult';
import { parseResponseValues } from '../utils/parseResponseValues';
import { toActionResult } from '../utils/toActionResult';
import { toFailureResult } from '../utils/toFailureResult';

export type RunOptions = {
  id: string;
  action: RegisteredAction;
  registry: ComponentRegistry;
};

// One run of an action. The handler runs as a normal async function; every awaited io call parks it on a
// promise stored in `pending` until the browser answers through respond().
export class Run {
  readonly id: string;
  private readonly action: RegisteredAction;
  private readonly registry: ComponentRegistry;
  private readonly listeners = new Set<RunListener>();
  private state: RunState;
  private pending: PendingStep | null = null;
  private finishedAt: DateTime | null = null;
  private stepCount = 0;

  constructor({ id, action, registry }: RunOptions) {
    this.id = id;
    this.action = action;
    this.registry = registry;
    this.state = { id, actionSlug: action.slug, actionName: action.name, version: 0, status: 'RUNNING', step: null, loading: null, result: null };
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
      const value = await this.action.handler(
        createIO({
          registry: this.registry,
          render: (components) => {
            return this.render(components);
          },
        }),
        {
          runId: this.id,
          action: { slug: this.action.slug },
          loading: {
            start: ({ label, description }) => {
              if (this.state.status === 'RUNNING') {
                this.update({ loading: { label, description: description ?? null } });
              }
            },
          },
        },
      );

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

  respond({ stepId, values }: StepResponse): RunRespondResult {
    if (this.state.status !== 'RUNNING') {
      return { status: 'RUN_CLOSED' };
    }

    if (!this.pending || this.pending.stepId !== stepId) {
      return { status: 'STALE_STEP' };
    }

    const parsed = parseResponseValues({ registry: this.registry, components: this.pending.components, values });

    if (parsed.status === 'INVALID') {
      // Same step again with the problems under their fields. The form keeps what the user typed, it is keyed by stepId.
      this.update({ step: { ...this.pending.step, errors: parsed.errors, message: parsed.message } });

      return {
        status: 'VALIDATION_ERROR',
        message:
          parsed.message ??
          parsed.errors.find((error) => {
            return error !== null;
          }) ??
          'Invalid values.',
      };
    }

    const { resolve } = this.pending;
    this.pending = null;
    this.update({ step: null });
    resolve(parsed.values);

    return { status: 'OK' };
  }

  cancel() {
    if (this.state.status !== 'RUNNING') {
      return;
    }

    const pending = this.pending;
    this.pending = null;
    this.finishedAt = DateTime.now();
    this.update({ status: 'CANCELED', step: null, loading: null, result: null });
    pending?.reject(new IOError('CANCELED'));
  }

  private render(components: StepComponent[]) {
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
      this.pending = { stepId: step.stepId, components, step, resolve, reject };
      this.update({ step, loading: null });
    });
  }

  // A canceled run already published its final state; whatever the handler does afterwards is ignored.
  private finish(result: NonNullable<RunState['result']>) {
    if (this.state.status !== 'RUNNING') {
      return;
    }

    this.pending = null;
    this.finishedAt = DateTime.now();
    this.update({ status: result.status, step: null, loading: null, result });
  }

  private update(changes: Partial<Pick<RunState, 'status' | 'step' | 'loading' | 'result'>>) {
    this.state = { ...this.state, ...changes, version: this.state.version + 1 };

    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }
}
