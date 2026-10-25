import { codeColors } from './codeColors';
import { codeToken as t } from './codeToken';
import type { CodeToken } from '../types/CodeToken';

const { keyword, string, fn, prop } = codeColors;

// The refund action the how-it-works demo runs, one array of tokens per line; line numbers start at 1.
export const howItWorksCode: CodeToken[][] = [
  [t('import', keyword), t(' { app } '), t('from', keyword), t(' '), t("'../app'", string), t(';')],
  [t('import', keyword), t(' { db } '), t('from', keyword), t(' '), t("'../db'", string), t(';')],
  [],
  [t('export const', keyword), t(' refundOrdersAction = app.'), t('defineAction', fn), t('({')],
  [t('  '), t('name', prop), t(': '), t("'Refund orders'", string), t(',')],
  [t('  '), t('handler', prop), t(': '), t('async', keyword), t(' ({ io, ctx }) => {')],
  [t('    const', keyword), t(' email = '), t('await', keyword), t(' io.input.'), t('email', fn), t('('), t("'Customer email'", string), t(');')],
  [t('    const', keyword), t(' orders = '), t('await', keyword), t(' db.order.'), t('findMany', fn), t('({ '), t('where', prop), t(': { email } });')],
  [],
  [t('    const', keyword), t(' toRefund = '), t('await', keyword), t(' io.select.'), t('table', fn), t('('), t("'Orders to refund'", string), t(', {')],
  [t('      '), t('data', prop), t(': orders,')],
  [t('      '), t('columns', prop), t(': ['), t("'number'", string), t(', '), t("'total'", string), t(', '), t("'placedAt'", string), t('],')],
  [t('      '), t('maxSelections', prop), t(': 10,')],
  [t('    });')],
  [],
  [t('    ctx.loading.'), t('start', fn), t('({')],
  [t('      '), t('label', prop), t(': '), t("'Refunding orders'", string), t(',')],
  [t('      '), t('itemsInQueue', prop), t(': toRefund.length,')],
  [t('    });')],
  [t('    for', keyword), t(' ('), t('const', keyword), t(' order '), t('of', keyword), t(' toRefund) {')],
  [t('      await', keyword), t(' db.refund.'), t('create', fn), t('({ '), t('data', prop), t(': { orderId: order.id } });')],
  [t('      ctx.loading.'), t('completeOne', fn), t('();')],
  [t('    }')],
  [],
  [t('    return', keyword), t(' { refunded: toRefund.length };')],
  [t('  },')],
  [t('});')],
];
