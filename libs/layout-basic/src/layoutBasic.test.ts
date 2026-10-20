import { expect, test } from 'vitest';
import { layoutBasic } from './layoutBasic';

test('Should take a title and an optional description', () => {
  expect(layoutBasic.props.safeParse({ title: 'Users' }).success).toBe(true);

  expect(layoutBasic.props.safeParse({ title: 'Users', description: 'Everyone who works with the back office.' }).success).toBe(true);
});

test('Should refuse a missing title', () => {
  expect(layoutBasic.props.safeParse({ description: 'Everyone who works with the back office.' }).success).toBe(false);
});
