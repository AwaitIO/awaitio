import type { AwaitIOEnvironment } from '../types/AwaitIOEnvironment';

export type ValidateEnvironmentsArgs = {
  environments: AwaitIOEnvironment[];
};

// Throws on a URL that is not http(s), since it becomes a link in the header, and on two environments with one host,
// since the host is how a server knows which one it is.
export const validateEnvironments = ({ environments }: ValidateEnvironmentsArgs) => {
  const hosts = new Set<string>();

  environments.forEach(({ title, url }) => {
    const parsed = URL.canParse(url) ? new URL(url) : null;

    if (!parsed || (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')) {
      throw new Error(`The URL of the environment "${title}" must be an http or https URL.`);
    }

    if (hosts.has(parsed.host)) {
      throw new Error(`Two environments use the host ${parsed.host}.`);
    }

    hosts.add(parsed.host);
  });
};
