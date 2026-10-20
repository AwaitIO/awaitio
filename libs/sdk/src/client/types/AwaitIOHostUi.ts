import type { FieldContext } from '../../uikit/FieldContext';
import type { formatCellValue } from '../../uikit/formatCellValue';
import type { navigateTo } from '../../uikit/navigateTo';
import type { themeBlockNames } from '../../uikit/themeBlockNames';
import type { ThemeBlocks } from '../../uikit/types/ThemeBlocks';
import type { useFieldId } from '../../uikit/useFieldId';

// window.__AWAITIO__.ui: what `awaitio/ui` is in a component, display component, layout or theme script. The helpers
// come from the core; the blocks are added by the theme scripts, a later theme replacing what an earlier one drew.
export type AwaitIOHostUi = Partial<ThemeBlocks> & {
  FieldContext: typeof FieldContext;
  formatCellValue: typeof formatCellValue;
  navigateTo: typeof navigateTo;
  themeBlockNames: typeof themeBlockNames;
  useFieldId: typeof useFieldId;
};
