export type UiScriptsState<TUi> = { status: 'loading' } | { status: 'ready'; uis: Map<string, TUi> } | { status: 'error'; message: string };
