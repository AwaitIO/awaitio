import type { actionRouteSchema } from '../../shared/schemas/actionRouteSchema';
import type { highlightColorSchema } from '../../shared/schemas/highlightColorSchema';
import type { tableCellSchema } from '../../shared/schemas/tableCellSchema';
import type { actionHref } from '../../shared/utils/actionHref';
import type { FieldContext } from '../../uikit/FieldContext';
import type { formatCellValue } from '../../uikit/formatCellValue';
import type { navigateTo } from '../../uikit/navigateTo';
import type { themeBlockNames } from '../../uikit/themeBlockNames';
import type { ThemeBlocks } from '../../uikit/types/ThemeBlocks';
import type { useFieldId } from '../../uikit/useFieldId';

// window.__AWAITIO__.ui: what `awaitio/ui` is in a component, display component, layout or theme script. The helpers
// come from the core; the blocks are added by the theme scripts, a later theme replacing what an earlier one drew.
export type AwaitIOHostUi = Partial<ThemeBlocks> & {
  actionHref: typeof actionHref;
  actionRouteSchema: typeof actionRouteSchema;
  FieldContext: typeof FieldContext;
  formatCellValue: typeof formatCellValue;
  highlightColorSchema: typeof highlightColorSchema;
  navigateTo: typeof navigateTo;
  tableCellSchema: typeof tableCellSchema;
  themeBlockNames: typeof themeBlockNames;
  useFieldId: typeof useFieldId;
};
