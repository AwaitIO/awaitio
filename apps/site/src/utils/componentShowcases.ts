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
  { method: 'io.input.text', description: 'One line of text', docsPath: '/io/input-text', Mock: TextMock },
  { method: 'io.input.email', description: 'An email address', docsPath: '/io/input-email', Mock: EmailMock },
  { method: 'io.input.url', description: 'A web address, returned as a URL', docsPath: '/io/input-url', Mock: UrlMock },
  { method: 'io.input.textarea', description: 'Longer text', docsPath: '/io/input-textarea', Mock: TextareaMock },
  { method: 'io.input.number', description: 'A number with min, max and decimals', docsPath: '/io/input-number', Mock: NumberMock },
  { method: 'io.input.boolean', description: 'Yes or no, with a checkbox', docsPath: '/io/input-boolean', Mock: BooleanMock },
  { method: 'io.input.datetime', description: 'A date and time, as a luxon DateTime', docsPath: '/io/input-datetime', Mock: DatetimeMock },
  { method: 'io.input.date', description: 'A day, as a luxon DateTime', docsPath: '/io/input-date', Mock: DateMock },
  { method: 'io.select.single', description: 'One option from a drop-down', docsPath: '/io/select-single', Mock: SelectMock },
  { method: 'io.select.multiple', description: 'Any number of options', docsPath: '/io/select-multiple', Mock: MultipleSelectMock },
  { method: 'io.select.table', description: 'Rows picked from a table', docsPath: '/io/select-table', Mock: SelectTableMock },
  { method: 'io.confirm', description: 'Ask before something irreversible', docsPath: '/io/confirm', Mock: ConfirmMock },
  { method: 'io.group', description: 'Several inputs on one screen', docsPath: '/io/group', Mock: GroupMock },
  { method: 'io.display.table', description: 'Rows from your database, with links and paging', docsPath: '/io/display-table', Mock: TableMock },
  { method: 'io.display.metadata', description: 'Label and value tiles', docsPath: '/io/display-metadata', Mock: MetadataMock },
  { method: 'io.display.link', description: 'A link inside or outside the app', docsPath: '/io/display-link', Mock: LinkMock },
  { method: 'io.display.heading', description: 'A section title', docsPath: '/io/display-heading', Mock: HeadingMock },
  { method: 'io.display.image', description: 'A picture, such as a file preview', docsPath: '/io/display-image', Mock: ImageMock },
  { method: 'io.display.markdown', description: 'Formatted text in a step', docsPath: '/io/display-markdown', Mock: MarkdownMock },
  { method: 'io.display.object', description: 'A record as a JSON tree', docsPath: '/io/display-object', Mock: ObjectMock },
  { method: 'io.display.html', description: 'HTML markup, sanitized first', docsPath: '/io/display-html', Mock: HtmlMock },
];
