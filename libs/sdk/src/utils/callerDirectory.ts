import { dirname } from 'path';
import { fileURLToPath } from 'url';

export type CallerDirectoryArgs = {
  depth: number;
};

// Folder of the file `depth` frames up the call stack, read from V8's structured stack trace.
// defineComponent uses it so a component package does not have to spell out where its built UI script is.
export const callerDirectory = ({ depth }: CallerDirectoryArgs) => {
  const previous = Error.prepareStackTrace;
  Error.prepareStackTrace = (_error, stack) => {
    return stack;
  };
  const stack = new Error().stack as unknown as NodeJS.CallSite[] | undefined;
  Error.prepareStackTrace = previous;
  const fileName = stack?.[depth + 1]?.getFileName();

  if (!fileName) {
    return null;
  }

  return dirname(fileName.startsWith('file://') ? fileURLToPath(fileName) : fileName);
};
