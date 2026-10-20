import { expect, test } from 'vitest';
import { z } from 'zod';
import { Run } from './Run';
import { defineComponent } from '../defineComponent';
import { defineDisplay } from '../defineDisplay';
import type { RunState } from '../shared/types/RunState';
import type { AwaitIOActionHandler } from '../types/AwaitIOActionHandler';
import type { IO } from '../types/IO';
import { createComponentRegistry } from '../utils/createComponentRegistry';

const components = {
  display: {
    note: defineDisplay({
      props: z.object({ text: z.string() }),
      component: () => {
        return null;
      },
    }),
  },
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

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['Petr'] })).toEqual({ status: 'OK' });

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

  await run.respond({ stepId: step?.stepId ?? '', values: ['Petr', 'Homoky'] });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: { firstName: 'Petr', lastName: 'Homoky' } });
});

test('Should show the same step again with the problem under its field when a value is invalid', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.input.text('Text', { minLength: 5 });
    },
  });
  const { step } = await waitForStep({ run });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['abc'] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Text must be at least 5 characters long.' });

  expect(run.current.step).toMatchObject({
    stepId: step?.stepId,
    errors: ['Text must be at least 5 characters long.'],
    message: null,
    components: [{ props: { minLength: 5 } }],
  });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['   '] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Text is required.' });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['abcdef'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: 'abcdef' });
});

test('Should report every invalid field of a group at once', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.group({ first: io.input.text('First'), second: io.input.text('Second', { minLength: 5 }), third: io.input.text('Third') });
    },
  });
  const { step } = await waitForStep({ run });

  await run.respond({ stepId: step?.stepId ?? '', values: ['', 'abc', 'fine'] });

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

  await run.respond({ stepId: first.step?.stepId ?? '', values: ['a'] });
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

  expect(await run.respond({ stepId: 'old-key', values: ['Petr'] })).toEqual({ status: 'STALE_STEP' });
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

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['Petr'] })).toEqual({ status: 'RUN_CLOSED' });

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

  expect(run.current.loading).toEqual({ label: 'Loading users…', description: null, itemsInQueue: null, itemsCompleted: 0 });

  const state = await waitForStep({ run });

  expect(state.loading).toBeNull();
});

test('Should count completed items up to itemsInQueue', async () => {
  const run = startRun({
    handler: async (io, ctx) => {
      ctx.loading.start({ label: 'Sending emails…', itemsInQueue: 2 });
      ctx.loading.completeOne();
      ctx.loading.completeOne();
      ctx.loading.completeOne();

      return io.input.text('Name');
    },
  });

  expect(run.current.loading).toEqual({ label: 'Sending emails…', description: null, itemsInQueue: 2, itemsCompleted: 2 });

  await waitForStep({ run });
});

test('Should change the label and keep the progress on update', async () => {
  const run = startRun({
    handler: async (io, ctx) => {
      ctx.loading.start({ label: 'Loading invoices…', itemsInQueue: 3 });
      ctx.loading.completeOne();
      ctx.loading.update({ label: 'Sending invoices…' });

      return io.input.text('Name');
    },
  });

  expect(run.current.loading).toEqual({ label: 'Sending invoices…', description: null, itemsInQueue: 3, itemsCompleted: 1 });

  await waitForStep({ run });
});

test('Should fill the progress bar on completeAll', async () => {
  const run = startRun({
    handler: async (io, ctx) => {
      ctx.loading.start({ label: 'Sending invoices…', itemsInQueue: 12 });
      ctx.loading.completeOne();
      ctx.loading.completeAll();

      return io.input.text('Name');
    },
  });

  expect(run.current.loading?.itemsCompleted).toBe(12);

  await waitForStep({ run });
});

test('Should ignore completeOne without itemsInQueue', async () => {
  const run = startRun({
    handler: async (io, ctx) => {
      ctx.loading.start({ label: 'Working…' });
      ctx.loading.completeOne();

      return io.input.text('Name');
    },
  });

  expect(run.current.loading?.itemsCompleted).toBe(0);

  await waitForStep({ run });
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

test('Should show a display component next to an input and give undefined for it', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.group({ note: io.display.note('Before you start', { text: 'Read this first' }), name: io.input.text('Name') });
    },
  });
  const { step } = await waitForStep({ run });

  expect(step?.components[0]).toEqual({ type: 'display.note', label: 'Before you start', props: { text: 'Read this first' }, display: true });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: [null, 'Petr'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: { name: 'Petr' } });
});

test('Should refuse display props that do not fit its schema', async () => {
  const run = startRun({
    handler: async (io) => {
      // @ts-expect-error text must be a string
      return io.display.note(null, { text: 1 });
    },
  });

  expect((await waitForFinish({ run })).status).toBe('FAILURE');
});

test('Should show the message of a field validator under its field and ask again', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.input.text('Email').validate((value) => {
        return value.endsWith('@example.com') ? undefined : 'Use a company address.';
      });
    },
  });
  const { step } = await waitForStep({ run });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['petr@gmail.com'] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Use a company address.' });

  expect(run.current.step?.errors).toEqual(['Use a company address.']);

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['petr@example.com'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: 'petr@example.com' });
});

test('Should run a field validator only after the component accepted the value', async () => {
  let calls = 0;
  const run = startRun({
    handler: async (io) => {
      return io.input.text('Name').validate(() => {
        calls += 1;

        return undefined;
      });
    },
  });
  const { step } = await waitForStep({ run });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: [''] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Name is required.' });

  expect(calls).toBe(0);
});

test('Should wait for an async validator and skip it for an optional field left empty', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.group({
        code: io.input.text('Code').validate(async (value) => {
          await new Promise((resolve) => {
            setTimeout(resolve, 5);
          });

          return value === 'taken' ? 'This code is taken.' : undefined;
        }),
        note: io.input
          .text('Note')
          .optional()
          .validate(() => {
            return 'Never shown for an empty note.';
          }),
      });
    },
  });
  const { step } = await waitForStep({ run });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['taken', ''] })).toEqual({ status: 'VALIDATION_ERROR', message: 'This code is taken.' });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['free', ''] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: { code: 'free' } });
});

test('Should show the message of a group validator for the whole step, once every field is fine', async () => {
  let calls = 0;
  const run = startRun({
    handler: async (io) => {
      return io.group({ password: io.input.text('Password'), again: io.input.text('Password again') }).validate(({ password, again }) => {
        calls += 1;

        return password === again ? undefined : 'The passwords do not match.';
      });
    },
  });
  const { step } = await waitForStep({ run });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['', 'secret'] })).toEqual({ status: 'VALIDATION_ERROR', message: 'Password is required.' });

  expect(calls).toBe(0);

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['secret', 'secrets'] })).toEqual({ status: 'VALIDATION_ERROR', message: 'The passwords do not match.' });

  expect(run.current.step).toMatchObject({ errors: [null, null], message: 'The passwords do not match.' });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['secret', 'secret'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).result).toEqual({ status: 'SUCCESS', data: { password: 'secret', again: 'secret' } });
});

test('Should fail the run when a validator throws', async () => {
  const run = startRun({
    handler: async (io) => {
      return io.input.text('Name').validate(() => {
        throw new Error('Database is down');
      });
    },
  });
  const { step } = await waitForStep({ run });

  expect(await run.respond({ stepId: step?.stepId ?? '', values: ['Petr'] })).toEqual({ status: 'OK' });

  expect((await waitForFinish({ run })).status).toBe('FAILURE');
});
