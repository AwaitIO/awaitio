import { InputUrlOutput } from '../../components/componentPages/inputUrl/InputUrlOutput';
import type { ComponentPage } from '../../types/ComponentPage';
import { codeColors } from '../codeColors';
import { codeToken as t } from '../codeToken';

const { keyword, string, fn, prop, comment } = codeColors;

export const inputUrlPage: ComponentPage = {
  slug: 'input-url',
  method: 'io.input.url',
  picture: {
    label: 'A URL field drawn in dots: a label above, an orange frame with a globe, the scheme in light orange, the address and a cursor',
    className: 'w-full max-w-2xl',
    rows: [
      '........................................................................',
      '........................................................................',
      '........................................................................',
      '...oooooooooooooo.......................................................',
      '...oooooooooooooo.......................................................',
      '........................................................................',
      '........................................................................',
      '....xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx....',
      '...x......xxx.......................................................x...',
      '...x....xx.x.xx............................................x........x...',
      '...x...x..x.x..x...........................................x........x...',
      '...x...xxxxxxxxx...------------..ooooooooooooo.o.oooooooo..x........x...',
      '...x...x..x.x..x...------------..ooooooooooooo.o.oooooooo..x........x...',
      '...x...xxxxxxxxx...------------..ooooooooooooo.o.oooooooo..x........x...',
      '...x...x..x.x..x...------------..ooooooooooooo.o.oooooooo..x........x...',
      '...x....xx.x.xx............................................x........x...',
      '...x......xxx..............................................x........x...',
      '...x................................................................x...',
      '....xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx....',
      '........................................................................',
      '........................................................................',
      '...----------..----------------.........................................',
      '...----------..----------------.........................................',
      '........................................................................',
      '........................................................................',
      '........................................................................',
    ],
  },
  headline: 'A web address, handed over as a URL.',
  summary: 'io.input.url asks a person for a web address and returns a URL object, with the allowed schemes checked on the server.',
  intro:
    '`io.input.url` asks a person for a web address. The handler gets a `URL`, not a string. Read the host or the path from it right away. Only http and https get through unless you say otherwise.',
  options: [
    {
      title: 'A URL, not a string.',
      body: 'Read `hostname`, `pathname` or `searchParams` straight from the answer. `href` gives the text.',
      code: [t('website.'), t('hostname', prop), t(' '), t("// 'northwind.example'", comment)],
      icon: 'returns',
    },
    {
      title: 'Only the schemes you allow.',
      body: '`allowedProtocols` lists the schemes the address may use. Without it, http and https.',
      code: [t('allowedProtocols', prop), t(': ['), t("'https'", string), t(']')],
      icon: 'link',
    },
    {
      title: 'Checked twice.',
      body: 'Something that is not a web address comes back with a message. The server checks every answer, so the browser cannot skip it.',
      code: [t('await', keyword), t(' io.input.'), t('url', fn), t('('), t("'Website'", string), t(')')],
      icon: 'server',
    },
    {
      title: 'Your own rule.',
      body: '`.validate()` gets the `URL` after the built-in checks. Return a message to turn the address down.',
      code: [t('url.protocol', prop), t(' === '), t("'https:'", string), t(' ? '), t('undefined', keyword), t(' : msg')],
      icon: 'validate',
    },
    {
      title: 'Starts filled.',
      body: '`defaultValue` takes a string or a `URL`. With `disabled: true` the person sees it but cannot change it.',
      code: [t('defaultValue', prop), t(': store.website')],
      icon: 'default',
    },
    {
      title: 'Or optional.',
      body: '`.optional()` lets the field stay empty. The handler then gets `URL | undefined`.',
      code: [t('await', keyword), t(' io.input.'), t('url', fn), t('('), t("'Homepage'", string), t(').'), t('optional', fn), t('()')],
      icon: 'optional',
    },
  ],
  example: {
    file: 'src/actions/stores/addStoreAction.ts',
    lines: [
      [t('import', keyword), t(' { app } '), t('from', keyword), t(" '../../app'", string), t(';')],
      [],
      [t('export const', keyword), t(' addStoreAction = app.'), t('defineAction', fn), t('({')],
      [t('  name', prop), t(': '), t("'Add store'", string), t(',')],
      [t('  handler', prop), t(': '), t('async', keyword), t(' ({ io }) => {')],
      [t('    const', keyword), t(' website = '), t('await', keyword), t(' io.input.'), t('url', fn), t('('), t("'Website'", string), t(', {')],
      [t('      placeholder', prop), t(': '), t("'https://example.com'", string), t(',')],
      [t('    });')],
      [],
      [t('    return', keyword), t(' '), t('`Store at ${website.hostname}.`', string), t(';')],
      [t('  },')],
      [t('});')],
    ],
    focus: [5, 6, 7],
  },
  Output: InputUrlOutput,
  outputUrl: 'tools.example.com/actions/stores/add_store',
  docs: [
    { label: 'Input URL', path: '/io/input-url', description: 'Every prop, what the URL gives you and the messages of the built-in checks.' },
    { label: 'Input components', path: '/core/input-components', description: 'Optional fields, your own checks and disabled fields, the same for every input.' },
    { label: 'io.group', path: '/io/group', description: 'Ask for the address next to other fields in one form with one Continue.' },
  ],
  lastModifiedAt: '2026-10-27',
};
