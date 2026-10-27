import { InputBooleanOutput } from '../../components/componentPages/inputBoolean/InputBooleanOutput';
import type { ComponentPage } from '../../types/ComponentPage';
import { codeColors } from '../codeColors';
import { codeToken as t } from '../codeToken';

const { keyword, string, fn, prop } = codeColors;

export const inputBooleanPage: ComponentPage = {
  slug: 'input-boolean',
  method: 'io.input.boolean',
  picture: {
    label: 'Two checkboxes drawn in dots: an orange one with a tick and an empty grey one, each with its text',
    className: 'w-full max-w-lg',
    rows: [
      '................................................................',
      '................................................................',
      '................................................................',
      '...xxxxxxxxxxx..................................................',
      '...xxxxxxxxxxx..................................................',
      '...xxxxxxxxx.x...oooooooooooooooooooooooooooooooooooooo.........',
      '...xxxxxxxx..x...oooooooooooooooooooooooooooooooooooooo.........',
      '...xxxxxxx..xx..................................................',
      '...xx.xxx..xxx..................................................',
      '...xx..x..xxxx..................................................',
      '...xxx...xxxxx...--------------------------.....................',
      '...xxxx.xxxxxx..................................................',
      '...xxxxxxxxxxx..................................................',
      '...xxxxxxxxxxx..................................................',
      '................................................................',
      '................................................................',
      '...ooooooooooo..................................................',
      '...ooooooooooo..................................................',
      '...oo.......oo...oooooooooooooooooooooooooooooooo...............',
      '...oo.......oo...oooooooooooooooooooooooooooooooo...............',
      '...oo.......oo..................................................',
      '...oo.......oo..................................................',
      '...oo.......oo..................................................',
      '...oo.......oo...--------------------...........................',
      '...oo.......oo..................................................',
      '...ooooooooooo..................................................',
      '...ooooooooooo..................................................',
      '................................................................',
      '................................................................',
      '................................................................',
    ],
  },
  headline: 'Yes or no, with a checkbox.',
  summary: 'io.input.boolean asks a yes or no question with a checkbox and returns true or false.',
  intro:
    '`io.input.boolean` asks a yes or no question with a checkbox. The handler gets `true` when the box is checked and `false` when it is not. Good for a choice that goes along with the action, such as emailing the customer.',
  options: [
    {
      title: 'What checking means.',
      body: 'The help text sits to the right of the box and says what a tick does. Every checkbox has one.',
      code: [t('helpText', prop), t(': '), t("'They get a copy'", string)],
      icon: 'help',
    },
    {
      title: 'Checked from the start.',
      body: 'The box starts empty. With `defaultValue: true` it starts checked.',
      code: [t('defaultValue', prop), t(': '), t('true', keyword)],
      icon: 'default',
    },
    {
      title: 'True or false.',
      body: 'The handler gets a `boolean`. An empty box is a valid answer, so nothing is checked on the way.',
      code: [t('if', keyword), t(' (sendEmail) '), t('await', keyword), t(' '), t('sendCopy', fn), t('(order);')],
      icon: 'returns',
    },
    {
      title: 'A box that must be ticked.',
      body: '`.validate()` can refuse an empty box with your message. The person answers again until it passes.',
      code: [t('.'), t('validate', fn), t('((isChecked) => '), t('check', fn), t('(isChecked))')],
      icon: 'validate',
    },
    {
      title: 'Shown, not changed.',
      body: 'With `disabled` the box shows its value and cannot be changed. The handler gets that value whatever the browser sends.',
      code: [t('defaultValue', prop), t(': '), t('true', keyword), t(', '), t('disabled', prop), t(': '), t('true', keyword)],
      icon: 'lock',
    },
    {
      title: 'Next to other fields.',
      body: 'Inside `io.group` the checkbox shares one form with other fields. The handler gets all the values together.',
      code: [t('await', keyword), t(' io.'), t('group', fn), t('({ amount, sendEmail })')],
      icon: 'group',
    },
  ],
  example: {
    file: 'src/actions/orders/cancelOrderAction.ts',
    lines: [
      [t('import', keyword), t(' { app } '), t('from', keyword), t(" '../../app'", string), t(';')],
      [],
      [t('export const', keyword), t(' cancelOrderAction = app.'), t('defineAction', fn), t('({')],
      [t('  name', prop), t(': '), t("'Cancel order'", string), t(',')],
      [t('  handler', prop), t(': '), t('async', keyword), t(' ({ io }) => {')],
      [t('    const', keyword), t(' notify = '), t('await', keyword), t(' io.input.'), t('boolean', fn), t('('), t("'Email the customer'", string), t(', {')],
      [t('      defaultValue', prop), t(': '), t('true', keyword), t(',')],
      [t('      helpText', prop), t(': '), t("'They get a copy of the cancellation'", string), t(',')],
      [t('    });')],
      [t('  },')],
      [t('});')],
    ],
    focus: [5, 6, 7, 8],
  },
  Output: InputBooleanOutput,
  outputUrl: 'tools.example.com/actions/orders/cancel_order',
  docs: [
    { label: 'Input Boolean', path: '/io/input-boolean', description: 'Every prop, what it returns and how to check it.' },
    { label: 'Input components', path: '/core/input-components', description: 'Your own checks and disabled fields, the same for every input.' },
    { label: 'io.group', path: '/io/group', description: 'Ask for several values on one form and check them together.' },
  ],
  lastModifiedAt: '2026-10-27',
};
