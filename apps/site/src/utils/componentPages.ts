import { confirmPage } from './componentPages/confirmPage';
import { displayHeadingPage } from './componentPages/displayHeadingPage';
import { displayHtmlPage } from './componentPages/displayHtmlPage';
import { displayImagePage } from './componentPages/displayImagePage';
import { displayLinkPage } from './componentPages/displayLinkPage';
import { displayMarkdownPage } from './componentPages/displayMarkdownPage';
import { displayMetadataPage } from './componentPages/displayMetadataPage';
import { displayObjectPage } from './componentPages/displayObjectPage';
import { displayTablePage } from './componentPages/displayTablePage';
import { groupPage } from './componentPages/groupPage';
import { inputBooleanPage } from './componentPages/inputBooleanPage';
import { inputDatePage } from './componentPages/inputDatePage';
import { inputDatetimePage } from './componentPages/inputDatetimePage';
import { inputEmailPage } from './componentPages/inputEmailPage';
import { inputNumberPage } from './componentPages/inputNumberPage';
import { inputTextareaPage } from './componentPages/inputTextareaPage';
import { inputTextPage } from './componentPages/inputTextPage';
import { inputUrlPage } from './componentPages/inputUrlPage';
import { selectMultiplePage } from './componentPages/selectMultiplePage';
import { selectSingleNativePage } from './componentPages/selectSingleNativePage';
import { selectSinglePage } from './componentPages/selectSinglePage';
import { selectTablePage } from './componentPages/selectTablePage';
import type { ComponentPage } from '../types/ComponentPage';

// Every component with a presentation page at /components/<slug>, in the order of the components on the home page.
export const componentPages: ComponentPage[] = [
  inputTextPage,
  inputEmailPage,
  inputUrlPage,
  inputTextareaPage,
  inputNumberPage,
  inputBooleanPage,
  inputDatetimePage,
  inputDatePage,
  selectSinglePage,
  selectSingleNativePage,
  selectMultiplePage,
  selectTablePage,
  confirmPage,
  groupPage,
  displayTablePage,
  displayMetadataPage,
  displayLinkPage,
  displayHeadingPage,
  displayImagePage,
  displayMarkdownPage,
  displayObjectPage,
  displayHtmlPage,
];
