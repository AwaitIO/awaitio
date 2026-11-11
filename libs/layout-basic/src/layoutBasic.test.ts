import { expect, test } from 'vitest';
import { layoutBasic } from './layoutBasic';

test('Should take a title and an optional description', () => {
  expect(layoutBasic.props.safeParse({ title: 'Users' }).success).toBe(true);

  expect(layoutBasic.props.safeParse({ title: 'Users', description: 'Everyone who works with the back office.' }).success).toBe(true);
});

test('Should refuse a missing title', () => {
  expect(layoutBasic.props.safeParse({ description: 'Everyone who works with the back office.' }).success).toBe(false);
});

test('Should take menu items that link to actions, each with a label', () => {
  expect(layoutBasic.props.safeParse({ title: 'Integrators', menuItems: [{ label: 'Create integrator', action: 'integrators/create_integrator' }] }).success).toBe(true);

  expect(layoutBasic.props.safeParse({ title: 'Integrators', menuItems: [{ action: 'integrators/create_integrator' }] }).success).toBe(false);
});

test('Should take menu items that link to pages, each with a label', () => {
  expect(layoutBasic.props.safeParse({ title: 'Coupons', menuItems: [{ label: 'Archive', page: 'coupons/archive', params: { year: '2026' } }] }).success).toBe(true);

  expect(layoutBasic.props.safeParse({ title: 'Coupons', menuItems: [{ page: 'coupons/archive' }] }).success).toBe(false);
});
