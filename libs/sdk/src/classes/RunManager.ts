import { DateTime, Duration } from 'luxon';
import { constants } from '../constants';
import { Run } from './Run';
import type { RunParams } from '../shared/types/RunParams';
import type { SessionUser } from '../shared/types/SessionUser';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { RegisteredAction } from '../types/RegisteredAction';
import type { RunListener } from '../types/RunListener';

export type RunManagerOptions = {
  registry: ComponentRegistry;
  cancelAfterDisconnect?: Duration;
};

export type RunManagerStartArgs = {
  action: RegisteredAction;
  user: SessionUser;
  params?: RunParams;
  ctxParams?: unknown;
};

export type RunManagerGetArgs = {
  id: string;
  user: SessionUser;
};

export type RunManagerSubscribeArgs = {
  run: Run;
  listener: RunListener;
};

// All runs live in memory. A server restart drops them, which is accepted: a parked handler is a closure and
// cannot be stored anywhere.
export class RunManager {
  private readonly runs = new Map<string, Run>();
  private readonly cancelTimers = new Map<string, NodeJS.Timeout>();
  private readonly registry: ComponentRegistry;
  private readonly cancelAfterDisconnect: Duration;
  private readonly sweepTimer: NodeJS.Timeout;

  constructor({ registry, cancelAfterDisconnect = constants.CANCEL_AFTER_DISCONNECT }: RunManagerOptions) {
    this.registry = registry;
    this.cancelAfterDisconnect = cancelAfterDisconnect;
    this.sweepTimer = setInterval(() => {
      this.sweep();
    }, constants.SWEEP_INTERVAL.as('milliseconds'));
    this.sweepTimer.unref();
  }

  start({ action, user, params = {}, ctxParams = params }: RunManagerStartArgs) {
    const run = new Run({ id: crypto.randomUUID(), action, user, params, ctxParams, registry: this.registry });
    this.runs.set(run.id, run);
    // Until a page subscribes, nobody can answer the handler, so the same grace period applies as for a closed page.
    this.scheduleCancel(run);
    void run.execute();

    return run;
  }

  // Another user's run is reported as missing, so its id reveals nothing.
  get({ id, user }: RunManagerGetArgs) {
    const run = this.runs.get(id);

    return run && run.user.email === user.email ? run : null;
  }

  subscribe({ run, listener }: RunManagerSubscribeArgs) {
    this.clearCancel(run.id);
    const unsubscribe = run.subscribe(listener);

    return () => {
      unsubscribe();

      if (run.subscriberCount === 0) {
        this.scheduleCancel(run);
      }
    };
  }

  close() {
    clearInterval(this.sweepTimer);

    this.runs.forEach((run) => {
      this.clearCancel(run.id);
      run.cancel();
    });
  }

  private scheduleCancel(run: Run) {
    if (run.current.status !== 'RUNNING') {
      return;
    }

    this.clearCancel(run.id);
    const timer = setTimeout(() => {
      this.cancelTimers.delete(run.id);

      if (run.subscriberCount === 0) {
        run.cancel();
      }
    }, this.cancelAfterDisconnect.as('milliseconds'));
    timer.unref();
    this.cancelTimers.set(run.id, timer);
  }

  private clearCancel(id: string) {
    clearTimeout(this.cancelTimers.get(id));
    this.cancelTimers.delete(id);
  }

  private sweep() {
    const cutoff = DateTime.now().minus(constants.FINISHED_RUN_TTL);

    this.runs.forEach((run, id) => {
      const finishedTime = run.finishedTime;

      if (finishedTime && finishedTime < cutoff) {
        this.runs.delete(id);
      }
    });
  }
}
