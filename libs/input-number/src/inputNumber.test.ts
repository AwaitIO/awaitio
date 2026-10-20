import { expect, test } from 'vitest';
import { inputNumber } from './inputNumber';

const validate = (value: number, props = {}) => {
  return inputNumber.validate?.({ label: 'Amount', props: inputNumber.props.parse(props), value }) ?? null;
};

test('Should turn the typed text into a number', () => {
  const result = inputNumber.returns.safeParse(' -12.5 ');

  expect(result.success && result.data).toBe(-12.5);
});

test('Should ask for a number when the field is empty or not a plain decimal', () => {
  const messages = ['', 'abc', '1e3', '0x10'].map((value) => {
    const result = inputNumber.returns.safeParse(value);

    return result.success === false && result.error.issues[0]?.message;
  });

  expect(messages).toEqual(['enter a number', 'enter a number', 'enter a number', 'enter a number']);
});

test('Should check min and max', () => {
  expect(validate(-1, { min: 0 })).toBe('Amount must be at least 0.');

  expect(validate(101, { max: 100 })).toBe('Amount must be at most 100.');

  expect(validate(50, { min: 0, max: 100 })).toBeNull();
});

test('Should accept only whole numbers unless decimals allow more', () => {
  expect(validate(1.5)).toBe('Amount must be a whole number.');

  expect(validate(1.555, { decimals: 2 })).toBe('Amount can have at most 2 decimal places.');

  expect(validate(1.55, { decimals: 2 })).toBeNull();
});

test('Should start from defaultValue as text', () => {
  expect(inputNumber.initialValue?.(inputNumber.props.parse({ defaultValue: 25 }))).toBe('25');

  expect(inputNumber.initialValue?.(inputNumber.props.parse({}))).toBe('');
});
