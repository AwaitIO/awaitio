import { expect, test } from 'vitest';
import { z } from 'zod/v4';
import { createComponentRegistry } from './createComponentRegistry';
import { parseResponseValues } from './parseResponseValues';
import { defineComponent } from '../defineComponent';

const registry = createComponentRegistry({
  tree: {
    input: {
      text: defineComponent({
        props: z.object({ defaultValue: z.string().optional() }),
        returns: z.string(),
        initialValue: (props) => {
          return props.defaultValue ?? '';
        },
        validate: ({ label, value }) => {
          return value.length === 0 ? `${label} is required.` : null;
        },
        component: () => {
          return null;
        },
      }),
    },
  },
});

test('Should keep the starting value of a disabled field, whatever the browser sends', () => {
  const result = parseResponseValues({ registry, components: [{ type: 'input.text', label: 'Plan', props: { defaultValue: 'Trial' }, disabled: true }], values: ['Enterprise'] });

  expect(result).toEqual({ status: 'VALID', values: ['Trial'] });
});

test('Should skip the checks of a disabled field', () => {
  const result = parseResponseValues({ registry, components: [{ type: 'input.text', label: 'Plan', props: {}, disabled: true }], values: [''] });

  expect(result).toEqual({ status: 'VALID', values: [''] });
});

test('Should still check a field that is not disabled', () => {
  const result = parseResponseValues({ registry, components: [{ type: 'input.text', label: 'Plan', props: {} }], values: [''] });

  expect(result.status).toBe('INVALID');
});

test('Should give undefined for an optional field left empty and skip its checks', () => {
  const result = parseResponseValues({ registry, components: [{ type: 'input.text', label: 'Note', props: {}, optional: true }], values: ['  '] });

  expect(result).toEqual({ status: 'VALID', values: [undefined] });
});

test('Should still check an optional field that was filled in', () => {
  const result = parseResponseValues({ registry, components: [{ type: 'input.text', label: 'Note', props: {}, optional: true }], values: ['Hello'] });

  expect(result).toEqual({ status: 'VALID', values: ['Hello'] });
});
