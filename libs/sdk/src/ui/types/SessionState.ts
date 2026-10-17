import type { SessionUser } from '../../shared/types/SessionUser';

export type SessionState = { status: 'LOADING' } | { status: 'ANONYMOUS' } | { status: 'AUTHENTICATED'; user: SessionUser } | { status: 'FAILED'; message: string };
