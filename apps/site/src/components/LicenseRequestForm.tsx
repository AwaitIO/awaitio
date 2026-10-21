'use client';

import { useState, type FC } from 'react';
import { FormField } from './FormField';
import type { LicenseRequest } from '../types/LicenseRequest';
import { buildLicenseMailto } from '../utils/buildLicenseMailto';
import { validateLicenseRequest } from '../utils/validateLicenseRequest';

const inputClassName = 'rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none';

export const LicenseRequestForm: FC = () => {
  const [request, setRequest] = useState<LicenseRequest>({ name: '', email: '', company: '', users: '4–10', billing: 'Monthly', message: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateLicenseRequest>>({});

  const change = <TKey extends keyof LicenseRequest>(key: TKey, value: LicenseRequest[TKey]) => {
    setRequest({ ...request, [key]: value });
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-gray-200 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const found = validateLicenseRequest(request);
        setErrors(found);

        if (Object.keys(found).length === 0) {
          window.location.href = buildLicenseMailto(request);
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="name" error={errors.name}>
          <input id="name" className={inputClassName} value={request.name} autoComplete="name" onChange={(event) => change('name', event.target.value)} />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" type="email" className={inputClassName} value={request.email} autoComplete="email" onChange={(event) => change('email', event.target.value)} />
        </FormField>
      </div>
      <FormField label="Company" htmlFor="company" error={errors.company}>
        <input id="company" className={inputClassName} value={request.company} autoComplete="organization" onChange={(event) => change('company', event.target.value)} />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Users" htmlFor="users">
          <select id="users" className={inputClassName} value={request.users} onChange={(event) => change('users', event.target.value as LicenseRequest['users'])}>
            <option value="4–10">4–10 users</option>
            <option value="More than 10">More than 10 users</option>
          </select>
        </FormField>
        <FormField label="Billing" htmlFor="billing">
          <select id="billing" className={inputClassName} value={request.billing} onChange={(event) => change('billing', event.target.value as LicenseRequest['billing'])}>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </FormField>
      </div>
      <FormField label="Message (optional)" htmlFor="message">
        <textarea id="message" rows={4} className={inputClassName} value={request.message} onChange={(event) => change('message', event.target.value)} />
      </FormField>
      <div className="flex flex-col gap-2">
        <button type="submit" className="self-start rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">
          Request a license
        </button>
        <p className="text-xs text-gray-500">This opens your email app with the request filled in; nothing is sent until you send that email.</p>
      </div>
    </form>
  );
};
