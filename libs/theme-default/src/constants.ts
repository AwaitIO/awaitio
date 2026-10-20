export const constants = {
  // One look for every text-like control, so all inputs of the theme match. The background is set per state
  // (enabled:/disabled:) because a plain bg-white from the SDK's utilities would win over disabled:bg-gray-100.
  CONTROL_CLASS_NAME: 'w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none enabled:bg-white disabled:bg-gray-100 disabled:text-gray-500',
  // A drop-down without the browser's arrow; SelectArrow draws one with room on the right.
  SELECT_CLASS_NAME:
    'w-full appearance-none rounded-md border border-gray-300 py-2 pr-9 pl-3 text-sm shadow-sm focus:border-gray-900 focus:outline-none enabled:bg-white disabled:bg-gray-100 disabled:text-gray-500',
};
