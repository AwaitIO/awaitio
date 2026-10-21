// Where the server serves AwaitIO (listen({ basePath })): '/backoffice', or '' at the root. It is read from the
// <base href> the server writes into the page; outside a browser there is no page and no prefix.
export const getBasePath = () => {
  if (typeof document === 'undefined') {
    return '';
  }

  return (document.querySelector('base')?.getAttribute('href') ?? '/').replace(/\/$/, '');
};
