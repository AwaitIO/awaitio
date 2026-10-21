import { app } from '../../../app';
import { constants } from '../../../constants';

export const displayImageAction = app.defineAction({
  name: 'Display image',
  description: 'io.display.image shows a picture, such as a product photo.',
  handler: async ({ io }) => {
    await io.display.image('Uploaded photo', {
      url: constants.PRODUCT_PHOTO_URL,
      size: 'medium',
    });

    return 'Photo shown.';
  },
});
