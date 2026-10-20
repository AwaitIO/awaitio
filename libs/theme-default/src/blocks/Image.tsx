import type { ImageProps } from 'awaitio/ui';
import type { FC } from 'react';

// A picture with a thin border, kept within the width of the page and, with a size, within that height.
export const Image: FC<ImageProps> = ({ src, alt, size }) => {
  const sizeClassName = { thumbnail: 'max-h-16', small: 'max-h-32', medium: 'max-h-64', large: 'max-h-96' }[size ?? 'large'];

  return <img src={src} alt={alt} loading="lazy" className={['max-w-full self-start rounded-md border border-gray-200 object-contain', size ? sizeClassName : ''].join(' ')} />;
};
