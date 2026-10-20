import { expect, test } from 'vitest';
import { displayHeading } from './displayHeading';

test('Should take an optional description and draw the label itself', () => {
  expect(displayHeading.props.parse({})).toEqual({ level: 2 });

  expect(displayHeading.props.parse({ description: 'Who can log in', level: 3 })).toEqual({ description: 'Who can log in', level: 3 });

  expect(displayHeading.wrap).toBe(false);
});
