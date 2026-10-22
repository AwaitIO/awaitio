import { app } from '../../../app';

export const selectSingleAction = app.defineAction({
  name: 'Select single',
  description: 'io.select.single asks to pick one option from a drop-down.',
  handler: async ({ io }) => {
    const role = await io.select.single('New role', {
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
      defaultValue: 'editor',
      clearable: true,
    });

    return role;
  },
});
