import { useEffect, useState, type FC } from 'react';
import { PageElements } from './PageElements';
import type { PageContent } from '../../shared/types/PageContent';
import { fetchPage } from '../api/fetchPage';
import { getSearchParams } from '../utils/getSearchParams';
import { toErrorMessage } from '../utils/toErrorMessage';

export type PageViewProps = {
  slug: string;
};

// The right part of a folder with a page: the handler runs on every visit, with the query string as ctx.params.
export const PageView: FC<PageViewProps> = ({ slug }) => {
  const [content, setContent] = useState<PageContent | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    fetchPage({ slug, params: getSearchParams() })
      .then((loaded) => {
        if (isCurrent) {
          setContent(loaded);
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setErrorMessage(toErrorMessage(error));
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  if (errorMessage) {
    return <p className="text-sm text-red-600">{errorMessage}</p>;
  }

  if (!content) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  return <PageElements layout={content.layout} />;
};
