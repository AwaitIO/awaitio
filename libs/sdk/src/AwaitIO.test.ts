import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { z } from 'zod';
import { AwaitIO } from './AwaitIO';
import { defineComponent } from './defineComponent';
import { runStateSchema } from './shared/schemas/runStateSchema';
import type { RunState } from './shared/types/RunState';
import { testApp } from './testing/testApp';
import { testUser } from './testing/testUser';
import type { AddressInfo } from 'net';

const { secret, password, passwordHash } = testUser;
const users = [{ email: 'petr@example.com', name: 'Petr', passwordHash }];
const noControl = () => {
  return null;
};
const app = testApp;
// A project with no actions yet.
const emptyActionsDirectory = mkdtempSync(join(tmpdir(), 'awaitio-actions-'));
let baseUrl = '';
let cookie = '';

beforeAll(async () => {
  const server = await app.listen({
    actionsDirectory: join(__dirname, 'testing', 'actions'),
    port: 0,
  });
  baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  cookie = await logIn({ email: 'petr@example.com' });
});

afterAll(async () => {
  await app.close();
});

type LogInArgs = {
  email: string;
  password?: string;
};

const requestLogIn = ({ email, password: candidate = password }: LogInArgs) => {
  return fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-AwaitIO-Request': '1' },
    body: JSON.stringify({ email, password: candidate }),
  });
};

// The `name=value` part of the session cookie.
const logIn = async (args: LogInArgs) => {
  return ((await requestLogIn(args)).headers.get('set-cookie') ?? '').split(';')[0];
};

// What the UI sends: the session cookie, its own header and a JSON body.
const authorized = (init: RequestInit = {}, sessionCookie = cookie) => {
  return { ...init, headers: { Cookie: sessionCookie, 'X-AwaitIO-Request': '1', 'Content-Type': 'application/json', ...init.headers } };
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

test('Should answer health checks without a session', async () => {
  expect((await fetch(`${baseUrl}/health`)).status).toBe(200);
});

test('Should tell the login page the project and the environment of the host, without the other URLs', async () => {
  const response = await fetch(`${baseUrl}/api/app`, { headers: { 'X-Forwarded-Host': 'tools.example.com' } });

  expect(await response.json()).toEqual({ name: 'Test app', environment: { title: 'Production', color: '#dc2626' }, environments: [] });

  expect(await (await fetch(`${baseUrl}/api/app`)).json()).toEqual({ name: 'Test app', environment: null, environments: [] });
});

test('Should list every environment with its URL to a logged-in user', async () => {
  const response = await fetch(`${baseUrl}/api/app`, authorized({ headers: { 'X-Forwarded-Host': 'staging.example.com' } }));

  expect((await response.json()).environments).toEqual([
    { title: 'Production', color: '#dc2626', url: 'https://tools.example.com', isCurrent: false },
    { title: 'Staging', color: '#f59e0b', url: 'https://staging.example.com', isCurrent: true },
  ]);
});

test('Should refuse an environment URL that is not http and two environments on one host', () => {
  expect(() => {
    return new AwaitIO({ name: 'Test app', secret, users, environments: [{ title: 'Evil', color: 'red', url: 'javascript:alert(1)' }] });
  }).toThrow('must be an http or https URL');

  expect(() => {
    return new AwaitIO({
      name: 'Test app',
      secret,
      users,
      environments: [
        { title: 'A', color: 'red', url: 'https://tools.example.com' },
        { title: 'B', color: 'blue', url: 'https://tools.example.com/b' },
      ],
    });
  }).toThrow('Two environments use the host tools.example.com.');
});

test('Should refuse the API and the component scripts without a session', async () => {
  expect((await fetch(`${baseUrl}/api/actions`)).status).toBe(401);

  expect((await fetch(`${baseUrl}/api/session`)).status).toBe(401);

  expect((await fetch(`${baseUrl}/components/input.text/ui.js`)).status).toBe(401);

  expect((await fetch(`${baseUrl}/api/actions`, authorized({}, 'awaitio_session=forged.signature'))).status).toBe(401);
});

test('Should log in with an email and a password', async () => {
  const response = await requestLogIn({ email: ' Petr@Example.com ' });

  expect([response.status, await response.json()]).toEqual([200, { email: 'petr@example.com', name: 'Petr' }]);

  const setCookie = response.headers.get('set-cookie') ?? '';

  expect(setCookie).toMatch(/^awaitio_session=[\w-]+\.[\w-]+; Max-Age=604800; Path=\/; Expires=.+; HttpOnly; SameSite=Strict$/);

  expect(setCookie).not.toContain(password);

  expect(await (await fetch(`${baseUrl}/api/session`, authorized({}, setCookie.split(';')[0]))).json()).toEqual({ email: 'petr@example.com', name: 'Petr' });
});

test('Should refuse a wrong password and an unknown email the same way', async () => {
  const wrongPassword = await requestLogIn({ email: 'petr@example.com', password: 'wrong password' });
  const unknownEmail = await requestLogIn({ email: 'nobody@example.com' });

  expect([wrongPassword.status, await wrongPassword.json(), wrongPassword.headers.get('set-cookie')]).toEqual([401, { error: 'INVALID_CREDENTIALS', message: 'Wrong email or password.' }, null]);

  expect([unknownEmail.status, await unknownEmail.json()]).toEqual([401, { error: 'INVALID_CREDENTIALS', message: 'Wrong email or password.' }]);
});

test('Should lock an email after too many failed logins', async () => {
  for (let attempt = 0; attempt < 10; attempt++) {
    await requestLogIn({ email: 'locked@example.com', password: 'wrong password' });
  }

  expect((await requestLogIn({ email: 'locked@example.com' })).status).toBe(429);

  expect((await requestLogIn({ email: 'eva@example.com' })).status).toBe(200);
});

test('Should refuse a login that does not come from the AwaitIO UI', async () => {
  const response = await fetch(`${baseUrl}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'petr@example.com', password }) });

  expect(response.status).toBe(403);
});

test('Should log out', async () => {
  const response = await fetch(`${baseUrl}/api/logout`, authorized({ method: 'POST', body: '{}' }, await logIn({ email: 'petr@example.com' })));

  expect([response.status, response.headers.get('set-cookie')]).toEqual([204, 'awaitio_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict']);
});

test('Should give the handler the user who started the run', async () => {
  const { runId } = await (await fetch(`${baseUrl}/api/actions/who_am_i/runs`, authorized({ method: 'POST' }))).json();
  const readState = createStateReader({ response: await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized()) });

  expect(
    (
      await readState((state) => {
        return state.status !== 'RUNNING';
      })
    ).result,
  ).toEqual({ status: 'SUCCESS', data: 'Petr <petr@example.com>' });
});

test('Should open an action with params from the link and keep them in the run state', async () => {
  const response = await fetch(`${baseUrl}/api/actions/echo_params/runs`, authorized({ method: 'POST', body: JSON.stringify({ params: { id: '42', tab: 'codes' } }) }));
  const { runId } = await response.json();
  const state = await createStateReader({ response: await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized()) })((candidate) => {
    return candidate.status !== 'RUNNING';
  });

  expect([state.params, state.result]).toEqual([
    { id: '42', tab: 'codes' },
    { status: 'SUCCESS', data: { id: '42', tab: 'codes' } },
  ]);
});

test('Should refuse params that are not strings', async () => {
  const response = await fetch(`${baseUrl}/api/actions/echo_params/runs`, authorized({ method: 'POST', body: JSON.stringify({ params: { id: 42 } }) }));

  expect(response.status).toBe(400);
});

test('Should parse params with the schema of the action and refuse a link that does not fit', async () => {
  const start = (params: Record<string, string>) => {
    return fetch(`${baseUrl}/api/actions/next_id/runs`, authorized({ method: 'POST', body: JSON.stringify({ params }) }));
  };
  const { runId } = await (await start({ id: '41' })).json();
  const state = await createStateReader({ response: await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized()) })((candidate) => {
    return candidate.status !== 'RUNNING';
  });

  expect([state.params, state.result]).toEqual([{ id: '41' }, { status: 'SUCCESS', data: 42 }]);

  const refused = await start({ id: 'abc' });

  expect([refused.status, await refused.json()]).toEqual([400, { error: 'INVALID_PARAMS', message: 'The link does not fit this action. id: Expected number, received nan.' }]);
});

test('Should hide a run from everyone but the user who started it', async () => {
  const { runId } = await (await fetch(`${baseUrl}/api/actions/full_name/runs`, authorized({ method: 'POST' }))).json();
  const eva = await logIn({ email: 'eva@example.com' });

  expect((await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized({}, eva))).status).toBe(404);

  expect((await fetch(`${baseUrl}/api/runs/${runId}/respond`, authorized({ method: 'POST', body: JSON.stringify({ stepId: 'any', values: [] }) }, eva))).status).toBe(404);

  expect((await fetch(`${baseUrl}/api/runs/${runId}/cancel`, authorized({ method: 'POST', body: '{}' }, eva))).status).toBe(404);

  expect((await fetch(`${baseUrl}/api/runs/${runId}/cancel`, authorized({ method: 'POST', body: '{}' }))).status).toBe(204);
});

test('Should list the actions in folder order, files before subfolders', async () => {
  expect(await (await fetch(`${baseUrl}/api/actions`, authorized())).json()).toMatchInlineSnapshot(`
    {
      "actions": [
        {
          "description": null,
          "name": "Echo params",
          "slug": "echo_params",
        },
        {
          "description": "Two fields",
          "name": "Full name",
          "slug": "full_name",
        },
        {
          "description": null,
          "name": "Hello",
          "slug": "hello",
        },
        {
          "description": null,
          "name": "Next id",
          "slug": "next_id",
        },
        {
          "description": null,
          "name": "Who am i",
          "slug": "who_am_i",
        },
        {
          "description": null,
          "name": "Send reminder",
          "slug": "billing/invoices/send_reminder",
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

test('Should refuse a cookie-authenticated POST that does not come from the AwaitIO UI', async () => {
  const url = `${baseUrl}/api/actions/hello/runs`;

  // A plain HTML form: no custom header, form or text body.
  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie } })).status).toBe(403);

  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'text/plain' }, body: '{}' })).status).toBe(403);

  // JSON without the UI header (a no-cors fetch cannot send either).
  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: '{}' })).status).toBe(403);

  expect((await fetch(url, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json', 'X-AwaitIO-Request': '1' }, body: '{}' })).status).toBe(201);
});

test('Should forbid other pages to frame the UI', async () => {
  const { headers } = await fetch(`${baseUrl}/health`);

  expect([headers.get('x-frame-options'), headers.get('content-security-policy'), headers.get('x-content-type-options')]).toEqual(['DENY', "frame-ancestors 'none'", 'nosniff']);
});

test('Should listen only on this machine unless a host is given', async () => {
  const local = new AwaitIO({ name: 'Test app', secret, users });
  const server = await local.listen({ actionsDirectory: emptyActionsDirectory, port: 0 });

  expect((server.address() as AddressInfo).address).toBe('127.0.0.1');

  await local.close();
});

test('Should serve the UI script of a registered component behind the login', async () => {
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
  const response = await fetch(`${baseUrl}/api/runs/${runId}/respond`, authorized({ method: 'POST', body: JSON.stringify({ stepId: step?.stepId, values: ['Petr', 42] }) }));

  expect([response.status, await response.json()]).toEqual([400, { error: 'VALIDATION_ERROR', message: 'Last name: Expected string, received number.' }]);

  await fetch(`${baseUrl}/api/runs/${runId}/cancel`, authorized({ method: 'POST' }));
});

test('Should refuse an empty project name', () => {
  expect(() => {
    return new AwaitIO({ name: ' ', secret, users });
  }).toThrow('The name must not be empty.');
});

test('Should refuse "group" as a component key', () => {
  expect(() => {
    return new AwaitIO({ name: 'Test app', secret, users, components: { group: { text: defineComponent({ props: z.object({}), returns: z.string(), component: noControl }) } } });
  }).toThrow('"group" is reserved');
});

test('Should allow listen() again after the port was taken', async () => {
  const another = new AwaitIO({ name: 'Test app', secret, users });
  const takenPort = Number(new URL(baseUrl).port);

  await expect(another.listen({ actionsDirectory: emptyActionsDirectory, port: takenPort })).rejects.toMatchObject({ code: 'EADDRINUSE' });

  const server = await another.listen({ actionsDirectory: emptyActionsDirectory, port: 0 });

  expect(server.listening).toBe(true);

  await another.close();
});

test('Should run an action from a nested folder by its encoded slug', async () => {
  const started = await fetch(`${baseUrl}/api/actions/${encodeURIComponent('billing/invoices/send_reminder')}/runs`, authorized({ method: 'POST' }));
  const { runId } = await started.json();
  const state = await createStateReader({ response: await fetch(`${baseUrl}/api/runs/${runId}/events`, authorized()) })((candidate) => {
    return candidate.status !== 'RUNNING';
  });

  expect([started.status, state.actionSlug, state.result]).toEqual([201, 'billing/invoices/send_reminder', { status: 'SUCCESS', data: 'Reminder sent' }]);
});

test('Should return 404 for an unknown action or run', async () => {
  expect((await fetch(`${baseUrl}/api/actions/missing/runs`, authorized({ method: 'POST' }))).status).toBe(404);

  expect((await fetch(`${baseUrl}/api/runs/missing/events`, authorized())).status).toBe(404);
});
