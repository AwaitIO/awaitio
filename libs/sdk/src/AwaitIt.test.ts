import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { z } from 'zod';
import { AwaitIt } from './AwaitIt';
import { defineComponent } from './defineComponent';
import { runStateSchema } from './shared/schemas/runStateSchema';
import type { RunState } from './shared/types/RunState';
import type { AddressInfo } from 'net';

const token = 'test-token-0123456789';
// Stands in for the folder of a built component package: <folder>/ui/ui.js.
const uiDirectory = mkdtempSync(join(tmpdir(), 'awaitit-'));
mkdirSync(join(uiDirectory, 'ui'));
writeFileSync(join(uiDirectory, 'ui', 'ui.js'), 'window.testComponentLoaded = true;');
const noControl = () => {
  return null;
};

const app = new AwaitIt({
  components: {
    input: {
      text: {
        ...defineComponent({
          props: z.object({}),
          returns: z.string(),
          validate: ({ label, value }) => {
            return value.trim().length === 0 ? `${label} is required.` : null;
          },
          component: noControl,
        }),
        uiDirectory,
      },
    },
  },
});
const fullName = app.action({
  description: 'Two fields',
  handler: async (io) => {
    const { firstName, lastName } = await io.group({ firstName: io.input.text('First name'), lastName: io.input.text('Last name') });

    return `${firstName} ${lastName}`;
  },
});
let baseUrl = '';

beforeAll(async () => {
  const server = await app.listen({
    token,
    routes: {
      hello: async () => {
        return 'Hello';
      },
      full_name: fullName,
    },
    port: 0,
  });
  baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  await app.close();
});

const authorized = (init: RequestInit = {}) => {
  return { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init.headers } };
};

type CreateStateReaderArgs = {
  response: Response;
};

// Reads `event: state` messages from an SSE response until one matches.
const createStateReader = ({ response }: CreateStateReaderArgs) => {
  const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = '';

  return async (predicate: (state: RunState) => boolean) => {
    for (;;) {
      const separatorIndex = buffer.indexOf('\n\n');

      if (separatorIndex !== -1) {
        const message = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);
        const data = message.split('\n').find((line) => {
          return line.startsWith('data: ');
        });

        if (data) {
          const state = runStateSchema.parse(JSON.parse(data.slice('data: '.length)));

          if (predicate(state)) {
            return state;
          }
        }

        continue;
      }

      const chunk = await reader?.read();

      if (!chunk || chunk.done) {
        throw new Error('The stream ended before the expected state.');
      }

      buffer += chunk.value;
    }
  };
};

test('Should answer health checks without a token', async () => {
  expect((await fetch(`${baseUrl}/health`)).status).toBe(200);
});

test('Should refuse the API and the UI without a token', async () => {
  expect((await fetch(`${baseUrl}/api/actions`)).status).toBe(401);

  expect((await fetch(`${baseUrl}/`)).status).toBe(401);

  expect((await fetch(`${baseUrl}/?token=wrong-token-0123456789`)).status).toBe(401);
});

test('Should swap the token in the URL for a session cookie', async () => {
  const response = await fetch(`${baseUrl}/runs/abc?token=${token}&x=1`, { redirect: 'manual' });

  expect(response.status).toBe(302);

  expect(response.headers.get('location')).toBe('/runs/abc?x=1');

  const cookie = response.headers.get('set-cookie') ?? '';

  expect(cookie).toMatch(/^awaitit_session=[0-9a-f]{64}; Max-Age=2592000; Path=\/; Expires=.+; HttpOnly; SameSite=Strict$/);

  expect(cookie).not.toContain(token);

  expect((await fetch(`${baseUrl}/api/actions`, { headers: { Cookie: cookie.split(';')[0] } })).status).toBe(200);
});

test('Should list the actions in route order', async () => {
  expect(await (await fetch(`${baseUrl}/api/actions`, authorized())).json()).toMatchInlineSnapshot(`
    {
      "actions": [
        {
          "description": null,
          "name": "Hello",
          "slug": "hello",
        },
        {
          "description": "Two fields",
          "name": "Full name",
          "slug": "full_name",
        },
      ],
    }
  `);
});

test('Should run an action with two fields over the API and the state stream', async () => {
  const { runId } = await (await fetch(`${baseUrl}/api/actions/full_name/runs`, authorized({ method: 'POST' }))).json();
  const events = await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized());

  expect(events.headers.get('content-type')).toBe('text/event-stream');

  const readState = createStateReader({ response: events });
  const { step } = await readState((state) => {
    return state.step !== null;
  });

  expect(
    step?.components.map((component) => {
      return component.label;
    }),
  ).toEqual(['First name', 'Last name']);

  type RespondArgs = {
    values: unknown[];
    stepId?: string;
  };

  const respond = ({ values, stepId = step?.stepId }: RespondArgs) => {
    return fetch(`${baseUrl}/api/runs/${runId}/respond`, authorized({ method: 'POST', body: JSON.stringify({ stepId, values }) }));
  };

  expect((await respond({ values: ['Petr', ''] })).status).toBe(400);

  expect((await respond({ values: ['Petr', 'Homoky'], stepId: 'stale' })).status).toBe(409);

  expect((await respond({ values: ['Petr', 'Homoky'] })).status).toBe(202);

  expect(
    (
      await readState((state) => {
        return state.status !== 'RUNNING';
      })
    ).result,
  ).toEqual({ status: 'SUCCESS', data: 'Petr Homoky' });

  expect((await respond({ values: ['Petr', 'Homoky'] })).status).toBe(409);
});

test('Should refuse an action start from another site that carries the session cookie', async () => {
  expect((await fetch(`${baseUrl}/api/actions/hello/runs`, authorized({ method: 'POST', headers: { 'Sec-Fetch-Site': 'same-site' } }))).status).toBe(403);

  expect((await fetch(`${baseUrl}/api/actions/hello/runs`, authorized({ method: 'POST', headers: { 'Sec-Fetch-Site': 'same-origin' } }))).status).toBe(201);
});

test('Should refuse a cookie-authenticated POST that does not come from the AwaitIt UI', async () => {
  const cookie = ((await fetch(`${baseUrl}/?token=${token}`, { redirect: 'manual' })).headers.get('set-cookie') ?? '').split(';')[0];
  const url = `${baseUrl}/api/actions/hello/runs`;

  // A plain HTML form: no custom header, form or text body.
  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie } })).status).toBe(403);

  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'text/plain' }, body: '{}' })).status).toBe(403);

  // JSON without the UI header (a no-cors fetch cannot send either).
  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: '{}' })).status).toBe(403);

  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json', 'X-AwaitIt-Request': '1' }, body: '{}' })).status).toBe(201);
});

test('Should forbid other pages to frame the UI', async () => {
  const { headers } = await fetch(`${baseUrl}/health`);

  expect([headers.get('x-frame-options'), headers.get('content-security-policy'), headers.get('x-content-type-options')]).toEqual(['DENY', "frame-ancestors 'none'", 'nosniff']);
});

test('Should listen only on this machine unless a host is given', async () => {
  const local = new AwaitIt();
  const server = await local.listen({ token, routes: {}, port: 0 });

  expect((server.address() as AddressInfo).address).toBe('127.0.0.1');

  await local.close();
});

test('Should serve the UI script of a registered component behind the token', async () => {
  expect((await fetch(`${baseUrl}/components/input.text/ui.js`)).status).toBe(401);

  const script = await fetch(`${baseUrl}/components/input.text/ui.js`, authorized());

  expect(script.headers.get('content-type')).toContain('javascript');

  expect(await script.text()).toBe('window.testComponentLoaded = true;');

  const style = await fetch(`${baseUrl}/components/input.text/ui.css`, authorized());

  expect([style.status, style.headers.get('content-type'), await style.text()]).toEqual([200, 'text/css; charset=utf-8', '']);

  expect((await fetch(`${baseUrl}/components/MISSING/ui.js`, authorized())).status).toBe(404);
});

test('Should reject a value that the component cannot parse', async () => {
  const { runId } = await (await fetch(`${baseUrl}/api/actions/full_name/runs`, authorized({ method: 'POST' }))).json();
  const readState = createStateReader({ response: await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized()) });
  const { step } = await readState((state) => {
    return state.step !== null;
  });
  const response = await fetch(
    `${baseUrl}/api/runs/${runId}/respond`,
    authorized({ method: 'POST', body: JSON.stringify({ stepId: step?.stepId, values: ['Petr', 42] }) }),
  );

  expect([response.status, await response.json()]).toEqual([400, { error: 'VALIDATION_ERROR', message: 'Last name: Expected string, received number.' }]);

  await fetch(`${baseUrl}/api/runs/${runId}/cancel`, authorized({ method: 'POST' }));
});

test('Should refuse "group" as a component key', () => {
  expect(() => {
    return new AwaitIt({ components: { group: { text: defineComponent({ props: z.object({}), returns: z.string(), component: noControl }) } } });
  }).toThrow('"group" is reserved');
});

test('Should allow listen() again after the port was taken', async () => {
  const another = new AwaitIt();
  const takenPort = Number(new URL(baseUrl).port);

  await expect(another.listen({ token, routes: {}, port: takenPort })).rejects.toMatchObject({ code: 'EADDRINUSE' });

  const server = await another.listen({ token, routes: {}, port: 0 });

  expect(server.listening).toBe(true);

  await another.close();
});

test('Should return 404 for an unknown action or run', async () => {
  expect((await fetch(`${baseUrl}/api/actions/missing/runs`, authorized({ method: 'POST' }))).status).toBe(404);

  expect((await fetch(`${baseUrl}/api/runs/missing/events`, authorized())).status).toBe(404);
});
