import { app } from '../../../app';

export const selectSingleNativeAction = app.defineAction({
  name: 'Select single native',
  description: 'io.select.singleNative asks to pick one option from a native drop-down.',
  handler: async ({ io }) => {
    const role = await io.select.singleNative('New role', {
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
      defaultValue: 'editor',
    });

    return role;
  },
});
