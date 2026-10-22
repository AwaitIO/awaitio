import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// The "Examples" section of the root LICENSE, read at build time so the pricing FAQ and examples are always the same text as the license.
// Each `### group` holds `#### question` entries followed by plain paragraphs.
export const readLicenseExamples = () => {
  const license = readFileSync(join(process.cwd(), '../../LICENSE'), 'utf8');
  const section = license.split('\n## Examples\n')[1]?.split('\n## ')[0];

  if (!section) {
    throw new Error('LICENSE has no "## Examples" section');
  }

  return section
    .split('\n### ')
    .slice(1)
    .map((group) => {
      const [title, ...entries] = group.split('\n#### ');
      const questions = entries.map((entry) => {
        const [question, ...rest] = entry.split('\n');
        const paragraphs = rest
          .join('\n')
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean);

        return { question: question.trim(), paragraphs };
      });

      return { title: title.trim(), questions };
    });
};
