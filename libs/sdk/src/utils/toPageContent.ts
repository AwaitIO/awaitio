import { formatZodError } from './formatZodError';
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
// only gets what it can draw. A bare array of display components goes into the layout registered as basic, titled
// with the page's name and description.
export const toPageContent = ({ page, result, registry, layoutRegistry }: ToPageContentArgs): PageContent => {
  const basicType = layoutRegistry.typeByKey.get('basic');

  if (Array.isArray(result) && !basicType) {
    throw new Error('The page returned display components without a layout. Register one under basic, e.g. layouts: { basic: layoutBasic } from @awaitio/layout-basic, or return io.layout.<name>({ children }).');
  }

  // Titled by the page, so a basic layout that requires a title still frames it.
  const layout: LayoutElement = Array.isArray(result) ? { kind: 'awaitio-layout-element', type: basicType ?? '', props: { title: page.name, description: page.description ?? undefined }, children: result } : result;

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

  return { slug: page.slug, name: page.name, description: page.description, layout: { type: layout.type, props: props.data as unknown, children } };
};
