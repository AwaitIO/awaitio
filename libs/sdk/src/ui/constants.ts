export const constants = {
  // Fired when the API answers 401: the session expired or the password changed, so the login form comes back.
  UNAUTHORIZED_EVENT: 'awaitio:unauthorized',
  // The favicon is logo 10 "Promise arc"; while busy its arc fills the ring like a progress bar, once per period.
  FAVICON_FRAMES_PER_SECOND: 12,
  FAVICON_FILL_PERIOD_MS: 1500,
  // How much of the ring the arc covers when it stands still: a quarter, from the top to three o'clock.
  FAVICON_STATIC_PROGRESS: 0.25,
  FAVICON_INK: '#111827',
  FAVICON_INK_DARK: '#ffffff',
  FAVICON_ACCENT: '#f97316',
};
