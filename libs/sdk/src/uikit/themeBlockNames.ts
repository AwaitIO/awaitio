import type { ThemeBlocks } from './types/ThemeBlocks';

// The blocks the themes together must provide; the server checks it at start.
export const themeBlockNames: (keyof ThemeBlocks)[] = [
  'Badge',
  'Button',
  'ButtonRow',
  'Card',
  'Checkbox',
  'ChoiceList',
  'Field',
  'Heading',
  'Hint',
  'Image',
  'Input',
  'Label',
  'Link',
  'Metadata',
  'MultiSelect',
  'NativeSelect',
  'Prose',
  'RowMenu',
  'Select',
  'Table',
  'Textarea',
];
