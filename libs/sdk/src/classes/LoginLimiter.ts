import { DateTime } from 'luxon';
import { constants } from '../constants';

type Failures = {
  count: number;
  firstAt: DateTime;
};

// Counts failed logins per email in memory. After MAX_FAILED_LOGINS the email is locked until its window ends,
// so a password can be guessed only a few dozen times an hour.
export class LoginLimiter {
  private readonly failures = new Map<string, Failures>();

  isLocked(email: string) {
    const failures = this.current(email);

    return failures !== null && failures.count >= constants.MAX_FAILED_LOGINS;
  }

  recordFailure(email: string) {
    const failures = this.current(email);
    this.failures.set(email, failures ? { ...failures, count: failures.count + 1 } : { count: 1, firstAt: DateTime.now() });
  }

  reset(email: string) {
    this.failures.delete(email);
  }

  private current(email: string) {
    const failures = this.failures.get(email);

    if (failures && failures.firstAt.plus(constants.FAILED_LOGIN_WINDOW) < DateTime.now()) {
      this.failures.delete(email);

      return null;
    }

    return failures ?? null;
  }
}
