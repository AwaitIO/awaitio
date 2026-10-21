export type LicenseRequest = {
  name: string;
  email: string;
  company: string;
  users: '4–10' | 'More than 10';
  billing: 'Monthly' | 'Yearly';
  message: string;
};
