import { BooleanMock } from '../components/componentMocks/BooleanMock';
import { ConfirmMock } from '../components/componentMocks/ConfirmMock';
import { DateMock } from '../components/componentMocks/DateMock';
import { DatetimeMock } from '../components/componentMocks/DatetimeMock';
import { EmailMock } from '../components/componentMocks/EmailMock';
import { GroupMock } from '../components/componentMocks/GroupMock';
import { HeadingMock } from '../components/componentMocks/HeadingMock';
import { HtmlMock } from '../components/componentMocks/HtmlMock';
import { ImageMock } from '../components/componentMocks/ImageMock';
import { LinkMock } from '../components/componentMocks/LinkMock';
import { MarkdownMock } from '../components/componentMocks/MarkdownMock';
import { MetadataMock } from '../components/componentMocks/MetadataMock';
import { MultipleSelectMock } from '../components/componentMocks/MultipleSelectMock';
import { NumberMock } from '../components/componentMocks/NumberMock';
import { ObjectMock } from '../components/componentMocks/ObjectMock';
import { SelectMock } from '../components/componentMocks/SelectMock';
import { SelectTableMock } from '../components/componentMocks/SelectTableMock';
import { TableMock } from '../components/componentMocks/TableMock';
import { TextareaMock } from '../components/componentMocks/TextareaMock';
import { TextMock } from '../components/componentMocks/TextMock';
import { UrlMock } from '../components/componentMocks/UrlMock';
import type { ComponentShowcase } from '../types/ComponentShowcase';

// Every io method, in the order of the docs: inputs, selects, confirm and group, then display components.
// Sketches only: the real components look close, not identical.
export const componentShowcases: ComponentShowcase[] = [
  { method: 'io.input.text', description: 'One line of text', slug: 'input-text', Mock: TextMock },
  { method: 'io.input.email', description: 'An email address', slug: 'input-email', Mock: EmailMock },
  { method: 'io.input.url', description: 'A web address, returned as a URL', slug: 'input-url', Mock: UrlMock },
  { method: 'io.input.textarea', description: 'Longer text', slug: 'input-textarea', Mock: TextareaMock },
  { method: 'io.input.number', description: 'A number with min, max and decimals', slug: 'input-number', Mock: NumberMock },
  { method: 'io.input.boolean', description: 'Yes or no, with a checkbox', slug: 'input-boolean', Mock: BooleanMock },
  { method: 'io.input.datetime', description: 'A date and time, as a luxon DateTime', slug: 'input-datetime', Mock: DatetimeMock },
  { method: 'io.input.date', description: 'A day, as a luxon DateTime', slug: 'input-date', Mock: DateMock },
  { method: 'io.select.single', description: 'One option from a drop-down', slug: 'select-single', Mock: SelectMock },
  { method: 'io.select.singleNative', description: 'One option from a native drop-down', slug: 'select-single-native', Mock: SelectMock },
  { method: 'io.select.multiple', description: 'Any number of options', slug: 'select-multiple', Mock: MultipleSelectMock },
  { method: 'io.select.table', description: 'Rows picked from a table', slug: 'select-table', Mock: SelectTableMock },
  { method: 'io.confirm', description: 'Ask before something irreversible', slug: 'confirm', Mock: ConfirmMock },
  { method: 'io.group', description: 'Several inputs on one screen', slug: 'group', Mock: GroupMock },
  { method: 'io.display.table', description: 'Rows from your database, with links and paging', slug: 'display-table', Mock: TableMock },
  { method: 'io.display.metadata', description: 'Label and value tiles', slug: 'display-metadata', Mock: MetadataMock },
  { method: 'io.display.link', description: 'A link inside or outside the app', slug: 'display-link', Mock: LinkMock },
  { method: 'io.display.heading', description: 'A section title', slug: 'display-heading', Mock: HeadingMock },
  { method: 'io.display.image', description: 'A picture, such as a file preview', slug: 'display-image', Mock: ImageMock },
  { method: 'io.display.markdown', description: 'Formatted text in a step', slug: 'display-markdown', Mock: MarkdownMock },
  { method: 'io.display.object', description: 'A record as a JSON tree', slug: 'display-object', Mock: ObjectMock },
  { method: 'io.display.html', description: 'HTML markup, sanitized first', slug: 'display-html', Mock: HtmlMock },
];
