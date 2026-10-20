import type { ThemeBlocks } from './types/ThemeBlocks';

// The blocks the themes together must provide; the server checks it at start.
export const themeBlockNames: (keyof ThemeBlocks)[] = ['Button', 'Card', 'ChoiceList', 'Field', 'Heading', 'Hint', 'Input', 'Label', 'Link', 'Metadata', 'RowMenu', 'Select', 'Table', 'Textarea'];
