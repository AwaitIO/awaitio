const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// A value from a database row as people read it: dates as "Oct 16, 2026, 9:30 AM", numbers with separators,
// booleans as Yes/No, nothing as "—". A Date arrives in the browser as an ISO string, so such strings are dates too.
export const formatCellValue = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (typeof value === 'number') {
    return value.toLocaleString('en-US');
  }

  if (typeof value === 'string' && ISO_DATE_TIME.test(value) && !Number.isNaN(Date.parse(value))) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  }

  if (typeof value === 'string' && ISO_DATE.test(value)) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
  }

  return typeof value === 'object' ? JSON.stringify(value) : String(value);
};
