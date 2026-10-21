import { constants } from '../constants';
import type { LicenseRequest } from '../types/LicenseRequest';

// The site is static, so the request leaves as an email from the visitor's own mail app.
export const buildLicenseMailto = (request: LicenseRequest) => {
  const body = [`Name: ${request.name}`, `Email: ${request.email}`, `Company: ${request.company}`, `Users: ${request.users}`, `Billing: ${request.billing}`, '', request.message].join('\n');

  return `mailto:${constants.CONTACT_EMAIL}?subject=${encodeURIComponent(constants.LICENSE_REQUEST_SUBJECT)}&body=${encodeURIComponent(body)}`;
};
