// Values the server and the UI must agree on.
export const constants = {
  // Sent by the AwaitIO UI on every API request. A page on another origin cannot add a custom header without a
  // CORS preflight, which the server never allows, so the header proves the request comes from the UI itself.
  REQUEST_HEADER_NAME: 'X-AwaitIO-Request',
};
