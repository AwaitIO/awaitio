import { match } from 'ts-pattern';
import { LoadingIndicator } from './LoadingIndicator';
import type { PageContent } from '../../shared/types/PageContent';
import { Heading } from '../../uikit/Heading';
import { displayUiRegistry } from '../displayUiRegistry';
import { useUiScripts } from '../hooks/useUiScripts';
import { layoutUiRegistry } from '../layoutUiRegistry';
import type { FC } from 'react';

export type PageElementsProps = {
  layout: PageContent['layout'];
};

// Loads the UI scripts of the page's layout and display components, draws each display component under its label and
// hands them to the layout to place.
export const PageElements: FC<PageElementsProps> = ({ layout }) => {
  const layoutUis = useUiScripts({ registry: layoutUiRegistry, types: [layout.type] });
  const displayUis = useUiScripts({
    registry: displayUiRegistry,
    types: layout.children.map((child) => {
      return child.type;
    }),
  });

  return match([layoutUis, displayUis] as const)
    .with(
      [{ status: 'error' }, { status: 'error' }],
      [{ status: 'error' }, { status: 'ready' }],
      [{ status: 'ready' }, { status: 'error' }],
      [{ status: 'error' }, { status: 'loading' }],
      [{ status: 'loading' }, { status: 'error' }],
      ([first, second]) => {
        return <p className="text-sm text-red-600">{first.status === 'error' ? first.message : second.status === 'error' ? second.message : ''}</p>;
      },
    )
    .with([{ status: 'ready' }, { status: 'ready' }], ([layoutReady, displayReady]) => {
      const Layout = layoutReady.uis.get(layout.type)?.component;
      const children = layout.children.map((child, index) => {
        const ui = displayReady.uis.get(child.type);
        const Display = ui?.component;

        return (
          <section key={index} className="flex min-w-0 flex-col gap-3">
            {child.label && ui?.wrap !== false && <Heading>{child.label}</Heading>}
            {Display && <Display label={child.label} props={child.props} />}
          </section>
        );
      });

      return Layout ? <Layout props={layout.props} children={children} /> : null;
    })
    .otherwise(() => {
      return <LoadingIndicator loading={{ label: 'Loading the page…', description: null, itemsInQueue: null, itemsCompleted: 0 }} />;
    });
};
