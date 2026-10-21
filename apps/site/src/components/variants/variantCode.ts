import type { CodeToken } from '../../types/CodeToken';
import { codeToken as t } from '../../utils/codeToken';

const keyword = 'text-rose-400';
const string = 'text-lime-300';
const fn = 'text-sky-300';

// Short lines of the createUser action, shared by the variants.
export const variantCode = {
  name: [t('export const', keyword), t(' createUserAction = app.'), t('defineAction', fn), t('({ '), t("name: 'Create user'", string), t(',')] as CodeToken[],
  handler: [t('  handler: '), t('async', keyword), t(' ({ io, ctx }) => {')] as CodeToken[],
  email: [t('    const', keyword), t(' email = '), t('await', keyword), t(' io.input.'), t('text', fn), t('('), t("'Email address'", string), t(');')] as CodeToken[],
  startsAt: [t('    const', keyword), t(' startsAt = '), t('await', keyword), t(' io.input.'), t('datetime', fn), t('('), t("'Start date'", string), t(');')] as CodeToken[],
  create: [t('    const', keyword), t(' user = '), t('await', keyword), t(' '), t('createUser', fn), t('({ email, startsAt });')] as CodeToken[],
  result: [t('    return', keyword), t(' { userId: user.id };')] as CodeToken[],
  close: [t('  },')] as CodeToken[],
  end: [t('});')] as CodeToken[],
};
