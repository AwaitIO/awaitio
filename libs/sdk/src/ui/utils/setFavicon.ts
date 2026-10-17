export type SetFaviconArgs = {
  svg: string;
};

// Points <link rel="icon"> at the SVG, creating the link when the page has none.
export const setFavicon = ({ svg }: SetFaviconArgs) => {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  const link = existing ?? document.createElement('link');

  if (!existing) {
    link.rel = 'icon';
    document.head.append(link);
  }

  link.type = 'image/svg+xml';
  link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
