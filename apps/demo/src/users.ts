import type { AwaitIOUser } from 'awaitio';

// One shared login for everyone who tries the demo. The password is "demo"; it is public on awaitio.com/demo.
export const users: AwaitIOUser[] = [
  {
    email: 'demo@awaitio.com',
    name: 'Demo',
    passwordHash: 'scrypt$32768$8$1$fcXGMiyWAeV8LwxWnWqRPQ==$hq3fP9NO6kIy3hEIWf+5yOV4DW28o7xs0MjfEExLXxc=',
  },
];
