import { expect, test } from 'vitest';
import { z } from 'zod';
import { Run } from './Run';
import { defineComponent } from '../defineComponent';
import type { RunState } from '../shared/types/RunState';
import type { AwaitIOActionHandler } from '../types/AwaitIOActionHandler';
import type { IO } from '../types/IO';
import { createComponentRegistry } from '../utils/createComponentRegistry';

const components = {
  input: {
    text: defineComponent({
      props: z.object({ minLength: z.number().optional() }),
      returns: z.string(),
      validate: ({ label, props, value }) => {
        if (value.trim().length === 0) {
          return `${label} is required.`;
        }

        return props.minLength !== undefined && value.length < props.minLength ? `${label} must be at least ${props.minLength} characters long.` : null;
      },
      component: () => {
        return null;
      },
    }),
  },
};

type StartRunArgs = {
  handler: AwaitIOActionHandler<IO<typeof components>>;
};

const startRun = ({ handler }: StartRunArgs) => {
  const run = new Run({
    id: 'run-1',
    action: { slug: 'test', name: 'Test', description: null, handler: handler as AwaitIOActionHandler<unknown, unknown>, params: null, unlisted: false },
    user: { email: 'petr@example.com', name: 'Petr' },
    params: { id: '42' },
    registry: createComponentRegistry({ tree: components }),
  });
  void run.execute();

  return run;
};

type WaitForStateArgs = {
  run: Run;
  predicate: (state: RunState) => boolean;
};

const waitForState = ({ run, predicate }: WaitForStateArgs) => {
  return new Promise<RunState>((resolve) => {
    const unsubscribe = run.subscribe((state) => {
      if (predicate(state)) {
        queueMicrotask(() => {
          unsubscribe();
        });
        resolve(state);
      }
    });
  });
};

type WaitForRunArgs = Pick<WaitForStateArgs, 'run'>;

const waitForStep = ({ run }: WaitForRunArgs) => {
  return waitForState({
    run,
    predicate: (state) => {
      return state.step !== null;
    },
  });
};

const waitForFinish = ({ run }: WaitForRunArgs) => {
  return waitForState({
    run,
    predicate: (state) => {
      return state.status !== 'RUNNING';
    },
  });
};

test('Should finish with the returned value when the action asks nothing', async () => {
  const run = startRun({
    handler: async () => {
      return 'Hello';
    },
  });

  expect((await waitForFinish({ run })).result).toMatchInlineSnapshot(`
    {
      "data": "Hello",
      "status": "SUCCESS",
    }
  `);
});

test('Should resume the handler with the submitted text', async () => {
  const run = startRun({
    handler: async (io) => {
      return `Hello, ${await io.input.text('Name')}!`;
    },
  });
  const { step } = await waitForStep({ run });

  expect(step?.components).toMatchInlineSnapshot(`
    [
      {
        "disabled": false,
        "label": "Name",
        "props": {},
        "type": "input.text",
      },
    ]
  `);

  expect(run.respond({ stepId: step?.stepId ?? '', values: ['Petr'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: 'Hello, Petr!' });
});

test('Should render a group as one step and return the values under their keys', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.group({ firstName: io.input.text('First name'), lastName: io.input.text('Last name') });
    },
  });
  const { step } = await waitForStep({ run });

  expect(step?.components.length).toBe(2);

  run.respond({ stepId: step?.stepId ?? '', values: ['Petr', 'Homoky'] });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: { firstName: 'Petr', lastName: 'Homoky' } });
});

test('Should show the same step again with the problem under its field when a value is invalid', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.input.text('Text', { minLength: 5 });
    },
  });
  const { step } = await waitForStep({ run });

  expect(run.respond({ stepId: step?.stepId ?? '', values: ['abc'] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Text must be at least 5 characters long.' });

  expect(run.current.step).toMatchObject({
    stepId: step?.stepId,
    errors: ['Text must be at least 5 characters long.'],
    message: null,
    components: [{ props: { minLength: 5 } }],
  });

  expect(run.respond({ stepId: step?.stepId ?? '', values: ['   '] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Text is required.' });

  expect(run.respond({ stepId: step?.stepId ?? '', values: ['abcdef'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: 'abcdef' });
});

test('Should report every invalid field of a group at once', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.group({ first: io.input.text('First'), second: io.input.text('Second', { minLength: 5 }), third: io.input.text('Third') });
    },
  });
  const { step } = await waitForStep({ run });

  run.respond({ stepId: step?.stepId ?? '', values: ['', 'abc', 'fine'] });

  expect(run.current.step?.errors).toEqual(['First is required.', 'Second must be at least 5 characters long.', null]);
});

test('Should number the steps of a run', async () => {
  const run = startRun({
    handler: async (io) => {
      const first = await io.input.text('First');

      return `${first} ${await io.input.text('Second')}`;
    },
  });
  const first = await waitForStep({ run });

  expect(first.step?.index).toBe(1);

  run.respond({ stepId: first.step?.stepId ?? '', values: ['a'] });
  const second = await waitForStep({ run });

  expect(second.step?.index).toBe(2);
});

test('Should reject an answer to a step that is no longer shown', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.input.text('Name');
    },
  });

  await waitForStep({ run });

  expect(run.respond({ stepId: 'old-key', values: ['Petr'] })).toEqual({ status: 'STALE_STEP' });
});

test('Should cancel a waiting action and refuse further answers', async () => {
  let handlerError: unknown = null;
  const run = startRun({
    handler: async (io) => {
      try {
        return await io.input.text('Name');
      } catch (error) {
        handlerError = error;
        throw error;
      }
    },
  });
  const { step } = await waitForStep({ run });

  run.cancel();

  expect(run.current).toMatchObject({ status: 'CANCELED', step: null, result: null });

  expect(run.respond({ stepId: step?.stepId ?? '', values: ['Petr'] })).toEqual({ status: 'RUN_CLOSED' });

  // The rejection travels through the IOPromise then-chain, which takes a few microtasks.
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  expect(handlerError).toMatchObject({ name: 'IOError', kind: 'CANCELED' });
});

test('Should tell a handler that kept working after a cancel why its next io call fails', async () => {
  let handlerError: unknown = null;
  const run = startRun({
    handler: async (io) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });

      try {
        return await io.input.text('Name');
      } catch (error) {
        handlerError = error;
        throw error;
      }
    },
  });

  run.cancel();
  await new Promise((resolve) => {
    setTimeout(resolve, 20);
  });

  expect(handlerError).toMatchObject({ name: 'IOError', kind: 'CANCELED' });
});

test('Should show the loading label until the next io call', async () => {
  const run = startRun({
    handler: async (io, ctx) => {
      ctx.loading.start({ label: 'Loading users…' });
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });

      return io.input.text('Name');
    },
  });

  expect(run.current.loading).toEqual({ label: 'Loading users…', description: null });

  const state = await waitForStep({ run });

  expect(state.loading).toBeNull();
});

test('Should fail the run when the handler throws', async () => {
  const run = startRun({
    handler: async () => {
      throw new Error('Something broke');
    },
  });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'FAILURE', error: 'Error', message: 'Something broke' });
});

test('Should fail the run when two io calls wait at the same time', async () => {
  const run = startRun({
    handler: async (io) => {
      return Promise.all([io.input.text('A'), io.input.text('B')]);
    },
  });

  expect((await waitForFinish({ run })).result).toMatchObject({ status: 'FAILURE', error: 'IOError' });
});

test('Should give the handler the params the run was opened with', async () => {
  const run = startRun({
    handler: async (_io, ctx) => {
      return ctx.params;
    },
  });

  expect([run.current.params, (await waitForFinish({ run })).result]).toEqual([{ id: '42' }, { status: 'SUCCESS', data: { id: '42' } }]);
});

test('Should end the run and send the browser to the action ctx.redirect names', async () => {
  let afterRedirect: unknown = null;
  const run = startRun({
    handler: async (io, ctx) => {
      await ctx.redirect({ label: 'Change role', action: 'users/change_role', params: { id: '7' } });

      try {
        await io.input.text('Name');
      } catch (error) {
        afterRedirect = error;
      }

      return 'ignored';
    },
  });
  const state = await waitForFinish({ run });

  expect([state.status, state.redirect, state.result]).toEqual(['REDIRECTED', '/actions/users/change_role?id=7', null]);

  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  expect(afterRedirect).toBeInstanceOf(Error);
});
