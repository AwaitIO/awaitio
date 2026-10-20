import { themeBlock } from './themeBlock';

// A picture, e.g. a chart from a chart service or a file preview.
export type ImageProps = {
  src: string;
  alt: string;
  // How tall it may get; without a size it is as wide as there is room for.
  size?: 'thumbnail' | 'small' | 'medium' | 'large';
};

export const Image = themeBlock<ImageProps>('Image');
