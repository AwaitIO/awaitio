import { Router, type IRouter } from 'express';
import { createPageIO } from '../io/createPageIO';
import { runParamsSchema } from '../shared/schemas/runParamsSchema';
import type { PageContent } from '../shared/types/PageContent';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { LayoutRegistry } from '../types/LayoutRegistry';
import type { RegisteredPage } from '../types/RegisteredPage';
import { formatZodError } from '../utils/formatZodError';
import { getSessionUser } from '../utils/getSessionUser';
import { toPageContent } from '../utils/toPageContent';

export type CreatePagesRouterArgs = {
  pages: Map<string, RegisteredPage>;
  registry: ComponentRegistry;
  layoutRegistry: LayoutRegistry;
};

// GET /api/pages/:slug runs the page's handler for the logged-in user and returns its layout and display components. A page keeps no state:
// every visit calls the handler again.
export const createPagesRouter = ({ pages, registry, layoutRegistry }: CreatePagesRouterArgs): IRouter => {
  const router = Router();
  const io = createPageIO({ registry, layoutRegistry });

  router.get('/pages/:slug', async (req, res) => {
    const page = pages.get(req.params.slug);

    if (!page) {
      return res.status(404).json({ error: 'PAGE_NOT_FOUND' });
    }

    // Only single string values: ?a=1&a=2 or nested keys are not something a link to a page carries.
    const query = Object.fromEntries(
      Object.entries(req.query).filter(([, value]) => {
        return typeof value === 'string';
      }),
    );
    const params = runParamsSchema.safeParse(query);

    if (!params.success) {
      return res.status(400).json({ error: 'INVALID_PARAMS', message: formatZodError({ error: params.error }) });
    }

    try {
      const result = await page.handler(io, { page: { slug: page.slug }, params: params.data, user: getSessionUser({ res }) });
      const body: PageContent = toPageContent({ page, result, registry, layoutRegistry });

      return res.json(body);
    } catch (error) {
      // Like a failed action: the message is shown to the logged-in user, who sees the same in a failed run.
      return res.status(500).json({ error: 'PAGE_FAILED', message: error instanceof Error ? error.message : String(error) });
    }
  });

  return router;
};
