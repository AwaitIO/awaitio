import { DisplayLinkOutput } from '../../components/componentPages/displayLink/DisplayLinkOutput';
import type { ComponentPage } from '../../types/ComponentPage';
import { codeColors } from '../codeColors';
import { codeToken as t } from '../codeToken';

const { keyword, string, fn, prop } = codeColors;

export const displayLinkPage: ComponentPage = {
  slug: 'display-link',
  method: 'io.display.link',
  picture: {
    label: 'A link drawn in dots: a grey heading, two chain links, the underlined link text and an arrow pointing out',
    className: 'w-full max-w-xl',
    rows: [
      '..................................................................',
      '..................................................................',
      '..................................................................',
      '....ooooooooooooooooo.............................................',
      '....ooooooooooooooooo.............................................',
      '..................................................................',
      '..................................................................',
      '..................................................................',
      '............xxxxxxxxxx............................................',
      '...........x..........x................................xxxxxxxx...',
      '...........x..........x....xxxxxxxxxxxx..xxxxxxxxx.....xxxxxxxx...',
      '.....xxxxxxxxxx.......x....xxxxxxxxxxxx..xxxxxxxxx..........xxx...',
      '....x..........x......x....xxxxxxxxxxxx..xxxxxxxxx.........xxxx...',
      '....x..........x......x....xxxxxxxxxxxx..xxxxxxxxx........xx.xx...',
      '....x.......xxxxxxxxxx.....xxxxxxxxxxxx..xxxxxxxxx.......xx..xx...',
      '....x..........x........................................xx...xx...',
      '....x..........x.......................................xx....xx...',
      '.....xxxxxxxxxx............-----------------------....xx..........',
      '.....................................................xx...........',
      '....................................................xx............',
      '..................................................................',
      '..................................................................',
      '..................................................................',
    ],
  },
  headline: 'One link, in the app or out of it.',
  summary: 'io.display.link shows a link to another action in the app or to a page outside it, on a page or in a step of an action.',
  intro: '`io.display.link` shows a link on a page or in a step of an action. It can open another action in the app or a page outside it. It only displays and returns nothing.',
  options: [
    {
      title: 'Out of the app.',
      body: 'An address with a scheme, such as `https://`, opens in a new tab.',
      code: [t('url', prop), t(': '), t("'https://status.example.com'", string)],
      icon: 'link',
    },
    {
      title: 'Into another action.',
      body: 'A path without a scheme stays in the app. It opens that action, here with its id.',
      code: [t('url', prop), t(': '), t("'/actions/users/change_role?id=2'", string)],
      icon: 'next',
    },
    {
      title: 'Your own words.',
      body: 'Set `text` to say what the link opens. Without it, the link shows the URL.',
      code: [t('text', prop), t(': '), t("'Open the invoice'", string)],
      icon: 'text',
    },
    {
      title: 'Email addresses.',
      body: 'A `mailto:` address works too. Like every address with a scheme, it opens in a new tab.',
      code: [t('url', prop), t(': '), t("'mailto:ana@northwind.example'", string)],
      icon: 'mail',
    },
    {
      title: 'A heading, or none.',
      body: 'The label is the heading above the link. Pass `null` for none.',
      code: [t('io.display.'), t('link', fn), t('('), t('null', keyword), t(', { url })')],
      icon: 'heading',
    },
    {
      title: 'On a page or in a step.',
      body: 'Put it on a folder page next to a table. In an action it is a step with Continue, or sits in a group next to inputs.',
      code: [t('await', keyword), t(' io.display.'), t('link', fn), t('('), t("'Map'", string), t(', { url })')],
      icon: 'page',
    },
  ],
  example: {
    file: 'src/actions/users/loginLinkAction.ts',
    lines: [
      [t('import', keyword), t(' { app } '), t('from', keyword), t(" '../../app'", string), t(';')],
      [t('import', keyword), t(' { createLoginToken } '), t('from', keyword), t(" '../../auth'", string), t(';')],
      [],
      [t('export const', keyword), t(' loginLinkAction = app.'), t('defineAction', fn), t('({')],
      [t('  name', prop), t(': '), t("'Login link'", string), t(',')],
      [t('  handler', prop), t(': '), t('async', keyword), t(' ({ io, ctx }) => {')],
      [t('    const', keyword), t(' token = '), t('await', keyword), t(' '), t('createLoginToken', fn), t('(ctx.user);')],
      [],
      [t('    await', keyword), t(' io.display.'), t('link', fn), t('('), t("'Login link'", string), t(', {')],
      [t('      url', prop), t(': '), t('`https://app.example.com/login/${token}`', string), t(',')],
      [t('    });')],
      [t('  },')],
      [t('});')],
    ],
    focus: [8, 9, 10],
  },
  Output: DisplayLinkOutput,
  outputUrl: 'tools.example.com/actions/users/login_link',
  docs: [
    { label: 'Display Link', path: '/io/display-link', description: 'Install, setup, the URL and the text, and which links open in a new tab.' },
    { label: 'Display components', path: '/core/display-components', description: 'Where a link can go: a page, a step of an action or a group next to inputs.' },
    { label: 'Routing', path: '/core/routing', description: 'The URL every action gets from its path, the one a link into the app points at.' },
  ],
  lastModifiedAt: '2026-10-27',
};
