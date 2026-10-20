import { expect, test } from 'vitest';
import { inputEmail } from './inputEmail';

test('Should accept an email address without the spaces around it', () => {
  const result = inputEmail.returns.safeParse('  ada@example.com ');

  expect(result.success && result.data).toBe('ada@example.com');
});

test('Should ask for an email address when the value is empty or not one', () => {
  const messages = ['', 'ada', 'ada@'].map((value) => {
    const result = inputEmail.returns.safeParse(value);

    return result.success === false && result.error.issues[0]?.message;
  });

  expect(messages).toEqual(['enter an email address', 'enter an email address', 'enter an email address']);
});

test('Should start from defaultValue', () => {
  expect(inputEmail.initialValue?.(inputEmail.props.parse({ defaultValue: 'ada@example.com' }))).toBe('ada@example.com');
});
