import { expect, test } from 'vitest';
import { z } from 'zod/v4';
import { Action } from './Action';

const handler = async () => {
  return null;
};

test('Should link to the action with its params as strings and its name as the label', () => {
  const action = new Action<unknown, z.ZodObject<{ id: z.ZodNumber; since: z.ZodOptional<z.ZodDate> }>>({
    name: 'Change role',
    params: z.object({ id: z.coerce.number(), since: z.coerce.date().optional() }),
    handler,
  });
  action.slug = 'users/change_role';

  expect(action.route({ params: { id: 7, since: new Date('2026-10-20T00:00:00.000Z') } })).toEqual({
    label: 'Change role',
    action: 'users/change_role',
    params: { id: '7', since: '2026-10-20T00:00:00.000Z' },
  });

  expect(action.route({ params: { id: 7 }, label: 'Edit' })).toEqual({ label: 'Edit', action: 'users/change_role', params: { id: '7' } });
});

test('Should link to an action without params', () => {
  const action = new Action<unknown, undefined>({ name: 'Clear cache', handler });
  action.slug = 'system/clear_cache';

  expect(action.route()).toEqual({ label: 'Clear cache', action: 'system/clear_cache', params: {} });
});

test('Should leave the params out when every param of the schema is optional', () => {
  const action = new Action<unknown, z.ZodObject<{ name: z.ZodOptional<z.ZodString> }>>({ name: 'Create integrator', params: z.object({ name: z.string().optional() }), handler });
  action.slug = 'integrators/upsert_integrator';

  expect(action.route({ label: 'Create integrator' })).toEqual({ label: 'Create integrator', action: 'integrators/upsert_integrator', params: {} });

  expect(action.route()).toEqual({ label: 'Create integrator', action: 'integrators/upsert_integrator', params: {} });
});

test('Should still require the params when the schema needs one', () => {
  const action = new Action<unknown, z.ZodObject<{ id: z.ZodNumber }>>({ name: 'Change role', params: z.object({ id: z.coerce.number() }), handler });
  action.slug = 'users/change_role';

  // @ts-expect-error id is required, so params cannot be left out
  expect(action.route({ label: 'Edit' })).toEqual({ label: 'Edit', action: 'users/change_role', params: {} });
});

test('Should refuse a route before the actions directory is loaded', () => {
  expect(() => {
    return new Action<unknown, undefined>({ name: 'Clear cache', handler }).route();
  }).toThrow('The action "Clear cache" has no route');
});
