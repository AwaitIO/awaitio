import { confirmAction } from './confirmAction';
import { displayHeadingAction } from './displays/displayHeadingAction';
import { displayHtmlAction } from './displays/displayHtmlAction';
import { displayImageAction } from './displays/displayImageAction';
import { displayLinkAction } from './displays/displayLinkAction';
import { displayMarkdownAction } from './displays/displayMarkdownAction';
import { displayMetadataAction } from './displays/displayMetadataAction';
import { displayObjectAction } from './displays/displayObjectAction';
import { displayTableAction } from './displays/displayTableAction';
import { displayTableCellsAction } from './displays/displayTableCellsAction';
import { groupAction } from './groupAction';
import { groupValidateAction } from './groupValidateAction';
import { inputDateAction } from './inputs/dates/inputDateAction';
import { inputDatetimeAction } from './inputs/dates/inputDatetimeAction';
import { inputBooleanAction } from './inputs/inputBooleanAction';
import { inputEmailAction } from './inputs/inputEmailAction';
import { inputNumberAction } from './inputs/inputNumberAction';
import { inputTextAction } from './inputs/inputTextAction';
import { inputTextareaAction } from './inputs/inputTextareaAction';
import { inputUrlAction } from './inputs/inputUrlAction';
import { selectMultipleAction } from './selects/selectMultipleAction';
import { selectSingleAction } from './selects/selectSingleAction';
import { selectTableAction } from './selects/selectTableAction';
import { app } from '../../app';

export const componentsPage = app.definePage({
  description: 'Every io component on its own, as the examples in the docs use it.',
  handler: async ({ io }) => {
    const examples = [
      { group: 'Input', action: inputTextAction, call: 'io.input.text' },
      { group: 'Input', action: inputTextareaAction, call: 'io.input.textarea' },
      { group: 'Input', action: inputNumberAction, call: 'io.input.number' },
      { group: 'Input', action: inputBooleanAction, call: 'io.input.boolean' },
      { group: 'Input', action: inputEmailAction, call: 'io.input.email' },
      { group: 'Input', action: inputUrlAction, call: 'io.input.url' },
      { group: 'Input', action: inputDateAction, call: 'io.input.date' },
      { group: 'Input', action: inputDatetimeAction, call: 'io.input.datetime' },
      { group: 'Select', action: selectSingleAction, call: 'io.select.single' },
      { group: 'Select', action: selectMultipleAction, call: 'io.select.multiple' },
      { group: 'Select', action: selectTableAction, call: 'io.select.table' },
      { group: 'Input', action: confirmAction, call: 'io.confirm' },
      { group: 'Display', action: displayHeadingAction, call: 'io.display.heading' },
      { group: 'Display', action: displayHtmlAction, call: 'io.display.html' },
      { group: 'Display', action: displayImageAction, call: 'io.display.image' },
      { group: 'Display', action: displayLinkAction, call: 'io.display.link' },
      { group: 'Display', action: displayMarkdownAction, call: 'io.display.markdown' },
      { group: 'Display', action: displayMetadataAction, call: 'io.display.metadata' },
      { group: 'Display', action: displayObjectAction, call: 'io.display.object' },
      { group: 'Display', action: displayTableAction, call: 'io.display.table' },
      { group: 'Display', action: displayTableCellsAction, call: 'io.display.table' },
      { group: 'Form', action: groupAction, call: 'io.group' },
      { group: 'Form', action: groupValidateAction, call: 'io.group(…).validate' },
    ];

    return io.layout.basic({
      title: 'Components',
      description: 'Every io component on its own, as the examples in the docs use it.',
      children: [
        io.display.markdown(
          'Each action asks or shows one component with the props from its page on [docs.awaitio.com](https://docs.awaitio.com). Open one to see how it looks and what the handler gets back.',
        ),
        io.display.table('Examples', {
          data: examples,
          columns: [
            { label: 'Example', renderCell: (example) => ({ label: example.action.name, route: example.action.route() }) },
            { label: 'Call', accessorKey: 'call' },
            {
              label: 'Kind',
              renderCell: (example) => ({
                label: example.group,
                highlightColor: example.group === 'Input' ? 'blue' : example.group === 'Select' ? 'purple' : example.group === 'Display' ? 'green' : 'gray',
              }),
            },
          ],
        }),
      ],
    });
  },
});
