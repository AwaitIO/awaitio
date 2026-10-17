import { extname } from 'path';
import { pathToFileURL } from 'url';

export type ImportActionFileArgs = {
  file: string;
};

// require() when the runtime has a loader for the extension: ts-node and tsx register one for .ts only there, and a
// native import() would hand the file to Node's ESM loader, which cannot read TypeScript. Everything else (.mjs,
// bundlers and test runners with their own module graph) goes through import().
export const importActionFile = async ({ file }: ImportActionFileArgs): Promise<unknown> => {
  if (typeof require === 'function' && extname(file) in require.extensions) {
    return require(file);
  }

  return import(pathToFileURL(file).href);
};
