// Values the server and the UI must agree on.
export const constants = {
  // Sent by the AwaitIO UI on every API request. A page on another origin cannot add a custom header without a
  // CORS preflight, which the server never allows, so the header proves the request comes from the UI itself.
  REQUEST_HEADER_NAME: 'X-AwaitIO-Request',
  // Dispatched on window after the UI changed the URL itself; links in layouts (awaitio/ui Link) fire it too.
  NAVIGATE_EVENT: 'awaitio:navigate',
  // The shortest password Create new account makes a hash for.
  MIN_PASSWORD_LENGTH: 10,
};
