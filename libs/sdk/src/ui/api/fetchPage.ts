import { requestJson } from './requestJson';
import { pageContentSchema } from '../../shared/schemas/pageContentSchema';
import type { RunParams } from '../../shared/types/RunParams';

export type FetchPageArgs = {
  slug: string;
  params: RunParams;
};

export const fetchPage = async ({ slug, params }: FetchPageArgs) => {
  const query = new URLSearchParams(params).toString();

  return pageContentSchema.parse(await requestJson({ path: `/api/pages/${encodeURIComponent(slug)}${query ? `?${query}` : ''}` }));
};
