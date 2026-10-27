import { InputTextOutput } from '../../components/componentPages/inputText/InputTextOutput';
import type { ComponentPage } from '../../types/ComponentPage';
import { codeColors } from '../codeColors';
import { codeToken as t } from '../codeToken';

const { keyword, string, fn, prop } = codeColors;

export const inputTextPage: ComponentPage = {
  slug: 'input-text',
  method: 'io.input.text',
  picture: {
    label: 'A text field drawn in dots: a label above, an orange frame with typed words and a cursor, and help text under it',
    className: 'w-full max-w-2xl',
    rows: [
      '........................................................................',
      '........................................................................',
      '........................................................................',
      '...oooooooooooooooo.....................................................',
      '...oooooooooooooooo.....................................................',
      '........................................................................',
      '........................................................................',
      '....xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx....',
      '...x................................................................x...',
      '...x......................................x.........................x...',
      '...x......................................x.........................x...',
      '...x...oooooooooo..oooooo..ooooooooooooo..x.........................x...',
      '...x...oooooooooo..oooooo..ooooooooooooo..x.........................x...',
      '...x...oooooooooo..oooooo..ooooooooooooo..x.........................x...',
      '...x...oooooooooo..oooooo..ooooooooooooo..x.........................x...',
      '...x......................................x.........................x...',
      '...x......................................x.........................x...',
      '...x................................................................x...',
      '....xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx....',
      '........................................................................',
      '........................................................................',
      '...---------..--------------..-------...................................',
      '...---------..--------------..-------...................................',
      '........................................................................',
      '........................................................................',
      '........................................................................',
    ],
  },
  headline: 'One line of text, typed by a person.',
  summary: 'io.input.text asks a person for one line of text and returns a string, with a placeholder, help text, length limits and checks on the server.',
  intro:
    '`io.input.text` asks a person for one line of text and waits for the answer. The handler gets a `string`. Use it for a name, a code or a search term. The server checks every answer before your code goes on.',
  options: [
    {
      title: 'A hint inside and under.',
      body: '`placeholder` shows in the empty field. `helpText` sits under it.',
      code: [t('helpText', prop), t(': '), t("'A user or what they did'", string)],
      icon: 'help',
    },
    {
      title: 'Starts filled.',
      body: '`defaultValue` opens the field with a value the person can change. Without it, the field starts empty.',
      code: [t('defaultValue', prop), t(': account.name')],
      icon: 'default',
    },
    {
      title: 'Length limits.',
      body: 'Set the fewest and the most characters. A wrong length comes back with a message under the field.',
      code: [t('minLength', prop), t(': 3, '), t('maxLength', prop), t(': 40')],
      icon: 'limits',
    },
    {
      title: 'Required by default.',
      body: 'An empty field or one with only spaces is sent back. The server checks it, so the browser cannot skip it.',
      code: [t('await', keyword), t(' io.input.'), t('text', fn), t('('), t("'Company name'", string), t(')')],
      icon: 'error',
    },
    {
      title: 'Or optional.',
      body: '`.optional()` lets the field stay empty. The handler then gets `string | undefined`.',
      code: [t('await', keyword), t(' io.input.'), t('text', fn), t('('), t("'Nickname'", string), t(').'), t('optional', fn), t('()')],
      icon: 'optional',
    },
    {
      title: 'Your own check.',
      body: '`.validate()` runs on the server after the built-in checks. It can ask your database and return a message for the field.',
      code: [t('.'), t('validate', fn), t('(checkUsername)')],
      icon: 'validate',
    },
    {
      title: 'Shown, not changed.',
      body: 'A disabled field shows its starting value and cannot be edited. The handler gets that value whatever the browser sends.',
      code: [t('defaultValue', prop), t(': plan, '), t('disabled', prop), t(': '), t('true', keyword)],
      icon: 'lock',
    },
    {
      title: 'A plain string.',
      body: 'The handler gets a `string`, exactly as typed. Spaces around it stay.',
      code: [t('const', keyword), t(' name = '), t('await', keyword), t(' io.input.'), t('text', fn), t('('), t("'Name'", string), t(')')],
      icon: 'returns',
    },
    {
      title: 'Next to other fields.',
      body: 'Inside `io.group` it is one field of a form. One Continue sends them all.',
      code: [t('company', prop), t(': io.input.'), t('text', fn), t('('), t("'Company name'", string), t('),')],
      icon: 'group',
    },
  ],
  example: {
    file: 'src/actions/accounts/createAccountAction.ts',
    lines: [
      [t('import', keyword), t(' { app } '), t('from', keyword), t(" '../../app'", string), t(';')],
      [],
      [t('export const', keyword), t(' createAccountAction = app.'), t('defineAction', fn), t('({')],
      [t('  name', prop), t(': '), t("'Create account'", string), t(',')],
      [t('  handler', prop), t(': '), t('async', keyword), t(' ({ io }) => {')],
      [t('    const', keyword), t(' company = '), t('await', keyword), t(' io.input.'), t('text', fn), t('('), t("'Company name'", string), t(', {')],
      [t('      placeholder', prop), t(': '), t("'Acme Inc.'", string), t(',')],
      [t('    });')],
      [],
      [t('    return', keyword), t(' '), t('`${company} has an account.`', string), t(';')],
      [t('  },')],
      [t('});')],
    ],
    focus: [5, 6, 7],
  },
  Output: InputTextOutput,
  outputUrl: 'tools.example.com/actions/accounts/create_account',
  docs: [
    { label: 'Input Text', path: '/io/input-text', description: 'Every prop, what it returns and the messages of the built-in checks.' },
    { label: 'Input components', path: '/core/input-components', description: 'Optional fields, your own checks and disabled fields, the same for every input.' },
    { label: 'io.group', path: '/io/group', description: 'Put the text field next to others in one form with one Continue.' },
  ],
  lastModifiedAt: '2026-10-27',
};
