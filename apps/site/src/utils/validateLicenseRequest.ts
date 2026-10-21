import type { LicenseRequest } from '../types/LicenseRequest';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// What is wrong with each required field, or an empty object when the request can be sent.
export const validateLicenseRequest = (request: LicenseRequest) => {
  const errors: Partial<Record<keyof LicenseRequest, string>> = {};

  if (request.name.trim().length === 0) {
    errors.name = 'Your name is required.';
  }

  if (!EMAIL_PATTERN.test(request.email.trim())) {
    errors.email = 'Enter an email address we can reply to.';
  }

  if (request.company.trim().length === 0) {
    errors.company = 'The company the license is for is required.';
  }

  return errors;
};
