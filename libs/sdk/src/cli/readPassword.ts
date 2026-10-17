import { createInterface } from 'readline';

// Asks twice without echoing on a terminal; reads the first line when the password is piped in.
export const readPassword = async () => {
  if (!process.stdin.isTTY) {
    const lines = createInterface({ input: process.stdin });

    for await (const line of lines) {
      lines.close();

      return line;
    }

    return '';
  }

  const ask = (question: string) => {
    return new Promise<string>((resolve) => {
      const prompt = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
      const mutableOutput = prompt as unknown as { _writeToOutput: (text: string) => void };
      mutableOutput._writeToOutput = (text: string) => {
        // Prints the question and the final newline, never the typed characters.
        if (text.startsWith(question) || text.includes('\n')) {
          process.stdout.write(text.startsWith(question) ? question : '\n');
        }
      };
      prompt.question(question, (answer) => {
        prompt.close();
        resolve(answer);
      });
    });
  };

  const password = await ask('Password: ');

  return (await ask('Repeat password: ')) === password ? password : null;
};
