import { confirm } from '@awaitio/confirm';
import { displayHeading } from '@awaitio/display-heading';
import { displayHtml } from '@awaitio/display-html';
import { displayImage } from '@awaitio/display-image';
import { displayLink } from '@awaitio/display-link';
import { displayMarkdown } from '@awaitio/display-markdown';
import { displayMetadata } from '@awaitio/display-metadata';
import { displayObject } from '@awaitio/display-object';
import { displayTable } from '@awaitio/display-table';
import { inputBoolean } from '@awaitio/input-boolean';
import { inputDate } from '@awaitio/input-date';
import { inputDatetime } from '@awaitio/input-datetime';
import { inputEmail } from '@awaitio/input-email';
import { inputNumber } from '@awaitio/input-number';
import { inputText } from '@awaitio/input-text';
import { inputTextarea } from '@awaitio/input-textarea';
import { inputUrl } from '@awaitio/input-url';
import { layoutBasic } from '@awaitio/layout-basic';
import { selectMultiple } from '@awaitio/select-multiple';
import { selectSingle } from '@awaitio/select-single';
import { selectTable } from '@awaitio/select-table';
import { defaultTheme } from '@awaitio/theme-default';
import { AwaitIO } from 'awaitio';
import { join } from 'path';
import { secrets } from './secrets';
import { users } from './users';

export const app = new AwaitIO({
  name: 'Backoffice',
  actionsDirectory: join(__dirname, 'actions'),
  theme: defaultTheme,
  secret: secrets.SESSION_SECRET,
  users,
  components: {
    input: {
      text: inputText,
      textarea: inputTextarea,
      number: inputNumber,
      boolean: inputBoolean,
      email: inputEmail,
      url: inputUrl,
      date: inputDate,
      datetime: inputDatetime,
    },
    select: {
      single: selectSingle,
      multiple: selectMultiple,
      table: selectTable,
    },
    display: {
      table: displayTable,
      metadata: displayMetadata,
      heading: displayHeading,
      markdown: displayMarkdown,
      link: displayLink,
      image: displayImage,
      object: displayObject,
      html: displayHtml,
    },
    confirm,
  },
  layouts: { basic: layoutBasic },
});
