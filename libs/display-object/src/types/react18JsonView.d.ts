// react18-json-view ships its types for `import` only; the dynamic import in a CommonJS package resolves to its CJS
// build, so the part the component uses is declared here.
declare module 'react18-json-view' {
  import type { ComponentType } from 'react';

  const JsonView: ComponentType<{ src: unknown; collapsed?: number }>;
  // The library's own default export, described as it is.
  // eslint-disable-next-line import/no-default-export
  export default JsonView;
}
