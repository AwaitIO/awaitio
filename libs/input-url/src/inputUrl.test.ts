import { expect, test } from 'vitest';
import { inputUrl } from './inputUrl';

const validate = (text: string, props = {}) => {
  const value = new URL(text);

  return inputUrl.validate?.({ label: 'Website', props: inputUrl.props.parse(props), value }) ?? null;
};

test('Should turn the typed text into a URL', () => {
  const result = inputUrl.returns.safeParse(' https://example.com/pricing ');

  expect(result.success && result.data.href).toBe('https://example.com/pricing');
});

test('Should ask for a URL when the value is empty or not one', () => {
  const messages = ['', 'example', 'http//x'].map((value) => {
    const result = inputUrl.returns.safeParse(value);

    return result.success === false && result.error.issues[0]?.message;
  });

  expect(messages).toEqual(['enter a URL', 'enter a URL', 'enter a URL']);
});

test('Should accept only the allowed protocols', () => {
  expect(validate('https://example.com')).toBeNull();

  expect(validate('ftp://example.com')).toBe('Website must start with http:// or https://.');

  expect(validate('ftp://example.com', { allowedProtocols: ['ftp'] })).toBeNull();
});

test('Should take a URL as defaultValue', () => {
  expect(inputUrl.initialValue?.(inputUrl.props.parse({ defaultValue: new URL('https://example.com') }))).toBe('https://example.com/');
});
