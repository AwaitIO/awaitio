export type ParseCookiesArgs = {
  header: string | undefined;
};

export const parseCookies = ({ header }: ParseCookiesArgs) => {
  const cookies = new Map<string, string>();

  (header ?? '').split(';').forEach((pair) => {
    const separatorIndex = pair.indexOf('=');

    if (separatorIndex === -1) {
      return;
    }

    try {
      cookies.set(pair.slice(0, separatorIndex).trim(), decodeURIComponent(pair.slice(separatorIndex + 1).trim()));
    } catch {
      // A malformed cookie from another app on the same host is skipped instead of failing the request.
    }
  });

  return cookies;
};
