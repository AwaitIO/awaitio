import { expect, test } from 'vitest';
import { displayLink } from './displayLink';

test('Should take a URL and an optional text', () => {
  expect(displayLink.props.parse({ url: 'https://example.com/login/abc' })).toEqual({ url: 'https://example.com/login/abc' });

  expect(displayLink.props.parse({ url: '/actions/users/change_role?id=2', text: 'Change role' })).toEqual({ url: '/actions/users/change_role?id=2', text: 'Change role' });
});

test('Should refuse a link without a URL', () => {
  expect(displayLink.props.safeParse({ url: '' }).success).toBe(false);

  expect(displayLink.props.safeParse({}).success).toBe(false);
});

test('Should take a route to an action or a page instead of a URL', () => {
  expect(displayLink.props.parse({ route: { label: 'Coupon', page: 'coupons/coupon_detail', params: { id: '42' } } })).toEqual({
    route: { label: 'Coupon', page: 'coupons/coupon_detail', params: { id: '42' } },
  });

  expect(displayLink.props.safeParse({ route: { label: 'Change role', action: 'users/change_role' }, text: 'Change it' }).success).toBe(false);

  expect(displayLink.props.safeParse({ route: { label: 'Nowhere' } }).success).toBe(false);
});
