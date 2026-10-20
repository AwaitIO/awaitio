import { testApp } from '../../testApp';

// A folder page: display components in a layout, built from the link's query string.
export const reportsPage = testApp.definePage({
  description: 'Monthly numbers',
  handler: async ({ io, ctx }) => {
    if (ctx.params.fail === 'props') {
      // Wrong on purpose: the server must refuse props the display component cannot draw.
      return [io.display.list('Broken', { items: [42 as unknown as string] })];
    }

    if (ctx.params.layout === 'columns') {
      return io.layout.columns({ count: 3, children: [io.display.list('Months', { items: ['January'] })] });
    }

    return [io.display.list('Months', { items: ['January', 'February'] }), io.display.list(`For ${ctx.user.name}`, { items: [ctx.params.month ?? 'none'], ordered: true })];
  },
});
