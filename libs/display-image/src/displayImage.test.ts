import { expect, test } from 'vitest';
import { displayImage } from './displayImage';

test('Should take a URL with an optional alt text and size', () => {
  expect(displayImage.props.parse({ url: 'https://quickchart.io/chart?c={}' })).toEqual({ url: 'https://quickchart.io/chart?c={}' });

  expect(displayImage.props.parse({ url: '/preview.png', alt: 'Preview', size: 'medium' })).toEqual({ url: '/preview.png', alt: 'Preview', size: 'medium' });
});

test('Should refuse an image without a URL or with an unknown size', () => {
  expect(displayImage.props.safeParse({ url: '' }).success).toBe(false);

  expect(displayImage.props.safeParse({ url: '/a.png', size: 'huge' }).success).toBe(false);
});
