import { expect, test } from 'vitest';
import { displayMarkdown } from './displayMarkdown';

test('Should take no props and draw the label itself', () => {
  expect(displayMarkdown.props.parse({})).toEqual({});

  expect(displayMarkdown.wrap).toBe(false);
});
