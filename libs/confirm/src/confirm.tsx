import { defineComponent } from 'awaitio';
import { Button, ButtonRow, Heading } from 'awaitio/ui';
import { z } from 'zod';

// Asks before something irreversible: the label as the question, Confirm and Cancel under it. Either button sends the
// step at once, so it has no Continue button. Ask it on its own, not in io.group.
export const confirm = defineComponent({
  props: z.object({
    helpText: z.string().optional(),
  }),
  // true for Confirm, false for Cancel.
  returns: z.boolean(),
  initialValue: () => {
    return false;
  },
  wrap: false,
  submitButton: false,
  component: ({ label, props, submit, disabled, autoFocus }) => {
    return (
      <>
        <Heading description={props.helpText}>{label}</Heading>
        <ButtonRow>
          <Button
            disabled={disabled}
            autoFocus={autoFocus}
            onClick={() => {
              submit(true);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            disabled={disabled}
            onClick={() => {
              submit(false);
            }}
          >
            Cancel
          </Button>
        </ButtonRow>
      </>
    );
  },
});
