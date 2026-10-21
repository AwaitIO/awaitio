export type NormalizeBasePathArgs = {
  basePath: string | undefined;
};

// '/backoffice' or '/backoffice/' becomes '/backoffice', the root becomes ''. The server writes it into the page, so
// only plain path segments pass.
export const normalizeBasePath = ({ basePath }: NormalizeBasePathArgs) => {
  const normalized = (basePath ?? '').replace(/\/$/, '');

  if (!/^(\/[A-Za-z0-9._~-]+)*$/.test(normalized)) {
    throw new Error(`The basePath must be a path like '/backoffice', got '${basePath}'.`);
  }

  return normalized;
};
