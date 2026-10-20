# Validation Guidelines

This document contains guidelines for writing validation schemas using Zod.

## Where Schemas Live

- io component schemas (`props`, `returns`) are written **inline in `defineComponent`**, never in a separate file or in `constants` (Petr's decision, see `CLAUDE.md`).
- Schemas shared by the server and the UI live in `libs/sdk/src/shared/schemas/`, one schema per file named `<name>Schema.ts`; the inferred type lives in `libs/sdk/src/shared/types/<Name>.ts` as `z.infer<typeof nameSchema>`.
- Environment variables are validated only in `apps/demo/src/secrets.ts` through `@homoky/znv`.
- Unknown input (request bodies, IO responses, SSE messages) is parsed with zod, never cast.

## String Validation Rules

### Required Minimum Length

Human-readable text fields that **a person fills in** MUST have a minimum length of 2 characters using `.min(2)`, even when the field is optional or nullable.

```typescript
// ✅ Correct - always include min(2)
title: z.string().min(2).optional().nullable(),
description: z.string().min(2).optional().nullable(),

// ❌ Incorrect - missing min(2)
title: z.string().optional().nullable(),
description: z.string().optional(),
```

### Rationale

When a string is provided, it must contain meaningful content (at least 2 characters). Empty strings or single characters are not considered valid input, regardless of whether the field is required or optional.

### AwaitIO Exceptions

- Presentation props of io components that the developer writes in code (`placeholder`, `helpText`, `label`-like texts) do not get `.min(2)`: they are not user input, and a short placeholder such as `–` is valid.
- The `returns` schema of an io component and value props that mirror it (`defaultValue`) do not get `.min(2)`: what the user typed is checked in `validate`, which returns a human-readable message (`${label} is required.`) instead of a zod error.
- Wire schemas in `libs/sdk/src/shared/schemas/` (run and step messages) are a contract between the server and the UI; a constraint is added there only together with both sides.
- Ids, slugs, tokens and other machine values use the constraint that fits them (`constants.ACTION_SLUG_PATTERN`, `.min(16)` for the access token), not `.min(2)`.

## Enum Validation

### Usage Pattern

For enum fields, use `z.enum([...])` with the literal values, and derive the type from the schema. Never write the union by hand next to the schema.

```typescript
// libs/sdk/src/shared/schemas/transactionStatusSchema.ts
export const transactionStatusSchema = z.enum(['RUNNING', 'SUCCESS', 'FAILURE', 'CANCELED']);

// libs/sdk/src/shared/types/TransactionStatus.ts
export type TransactionStatus = z.infer<typeof transactionStatusSchema>;
```

```typescript
// ❌ Incorrect - the union duplicates the schema and can drift from it
export type TransactionStatus = 'RUNNING' | 'SUCCESS' | 'FAILURE' | 'CANCELED';
export const transactionStatusSchema = z.string();
```
