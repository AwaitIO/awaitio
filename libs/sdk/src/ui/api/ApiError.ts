export type ApiErrorOptions = {
  status: number;
  code: string;
  message?: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor({ status, code, message }: ApiErrorOptions) {
    super(message ?? code);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}
