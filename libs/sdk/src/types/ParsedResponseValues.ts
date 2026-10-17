export type ParsedResponseValues = { status: 'VALID'; values: unknown[] } | { status: 'INVALID'; errors: (string | null)[]; message: string | null };
