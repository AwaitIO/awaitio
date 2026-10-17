import type { SessionUser } from '../shared/types/SessionUser';

export type SessionsLoginResult = { status: 'OK'; user: SessionUser; cookie: string } | { status: 'INVALID_CREDENTIALS' } | { status: 'LOCKED' };
