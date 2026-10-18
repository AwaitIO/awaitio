import { formatZodError } from './formatZodError';
import { constants as sharedConstants } from '../shared/constants';
import type { PageContent } from '../shared/types/PageContent';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { LayoutElement } from '../types/LayoutElement';
import type { LayoutRegistry } from '../types/LayoutRegistry';
import type { PageHandlerResult } from '../types/PageHandlerResult';
import type { RegisteredPage } from '../types/RegisteredPage';

export type ToPageContentArgs = {
  page: RegisteredPage;
  result: PageHandlerResult;
  registry: ComponentRegistry;
  layoutRegistry: LayoutRegistry;
};

const isTagged = (value: unknown, kind: string) => {
  return typeof value === 'object' && value !== null && 'kind' in value && value.kind === kind;
};

// Checks what a page handler returned and parses the layout's and every display component's props, so the browser
// only gets what it can draw. A bare array of display components goes into the basic layout.
export const toPageContent = ({ page, result, registry, layoutRegistry }: ToPageContentArgs): PageContent => {
  const layout: LayoutElement = Array.isArray(result) ? { kind: 'awaitio-layout-element', type: sharedConstants.BASIC_LAYOUT_TYPE, props: {}, children: result } : result;

  if (!isTagged(layout, 'awaitio-layout-element')) {
    throw new Error('The page handler must return io.layout.<name>({ …, children }) or an array of io.display.<name>(…).');
  }

  const definition = layoutRegistry.byType.get(layout.type);

  if (!definition) {
    throw new Error(`Unknown layout "${layout.type}".`);
  }

  const props = definition.props.safeParse(layout.props);

  if (!props.success) {
    throw new Error(`io.layout: ${formatZodError({ error: props.error })}`);
  }

  const children = layout.children.map((child, index) => {
    if (!isTagged(child, 'awaitio-display-element')) {
      throw new Error(`Layout child ${index + 1} is not io.display.<name>(…).`);
    }

    const display = registry.displayByType.get(child.type);

    if (!display) {
      throw new Error(`Unknown display component "${child.type}".`);
    }

    const parsed = display.props.safeParse(child.props);

    if (!parsed.success) {
      throw new Error(`io.${child.type}: ${formatZodError({ error: parsed.error })}`);
    }

    return { type: child.type, label: child.label, props: parsed.data as unknown };
  });
  // The basic layout titles the page with its name and description unless the handler gave its own.
  const layoutProps = layout.type === sharedConstants.BASIC_LAYOUT_TYPE ? { title: page.name, description: page.description ?? undefined, ...(props.data as object) } : (props.data as unknown);

  return { slug: page.slug, name: page.name, description: page.description, layout: { type: layout.type, props: layoutProps, children } };
};
