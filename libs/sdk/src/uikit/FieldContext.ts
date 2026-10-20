import { createContext } from 'react';

// The id of the control inside the current Field, so the label points at it without the component passing ids around.
// It lives in the core, not in a theme, so a Field from one theme and an Input from another still find each other.
export const FieldContext = createContext<string | undefined>(undefined);
