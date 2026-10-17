// The SDK UI puts React and the component registry on window under this name. Component packages build their
// UI script with react and react/jsx-runtime mapped to `${hostGlobalName}.React` and `${hostGlobalName}.jsxRuntime`.
export const hostGlobalName = '__AWAITIT__';
