// The handler's own check of an answer: an error message for the person, or nothing when the answer is fine.
export type IOValidator<T> = (value: T) => string | null | undefined | Promise<string | null | undefined>;
