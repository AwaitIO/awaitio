import type { app } from '../app';

export type AppIO = Parameters<Parameters<typeof app.defineAction>[0]['handler']>[0]['io'];
