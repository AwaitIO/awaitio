import type { PageHandler } from '../types/PageHandler';
import type { PageOptions } from '../types/PageOptions';

// Created through app.definePage() in a folder's index file, which fills in the io type from the registered display components and layouts.
export class Page<TIO> {
  // Recognizes a page loaded from the actions directory even when it comes from another copy of the package.
  readonly kind = 'awaitio-page';
  readonly name: string | undefined;
  readonly description: string | undefined;
  readonly handler: PageHandler<TIO>;

  constructor({ name, description, handler }: PageOptions<TIO>) {
    this.name = name;
    this.description = description;
    this.handler = handler;
  }
}
