import { expect, test } from 'vitest';
import { displayHtml } from './displayHtml';

test('Should take the markup as a string', () => {
  expect(displayHtml.props.parse({ html: '<p>Hello</p>' })).toEqual({ html: '<p>Hello</p>' });

  expect(displayHtml.props.safeParse({}).success).toBe(false);
});
