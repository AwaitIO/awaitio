import { expect, test } from 'vitest';
import { routeHref } from './routeHref';

test('Should build the URL of an action or of a folder page from its route', () => {
  expect(routeHref({ label: 'Change role', action: 'users/change_role', params: { id: '7' } })).toBe('/actions/users/change_role?id=7');

  expect(routeHref({ label: 'Coupon', page: 'coupons/coupon_detail', params: { id: '42' } })).toBe('/groups/coupons/coupon_detail?id=42');
});
