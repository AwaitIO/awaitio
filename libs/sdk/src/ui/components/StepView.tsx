import { match } from 'ts-pattern';
import { LoadingIndicator } from './LoadingIndicator';
import { StepForm } from './StepForm';
import type { Step } from '../../shared/types/Step';
import { componentUiRegistry } from '../componentUiRegistry';
import { displayUiRegistry } from '../displayUiRegistry';
import { useUiScripts } from '../hooks/useUiScripts';
import type { FC } from 'react';

export type StepViewProps = {
  runId: string;
  step: Step;
};

// Loads the UI scripts of the step's inputs and display components first, then shows the form.
export const StepView: FC<StepViewProps> = ({ runId, step }) => {
  const componentUis = useUiScripts({
    registry: componentUiRegistry,
    types: step.components
      .filter((component) => {
        return !component.display;
      })
      .map((component) => {
        return component.type;
      }),
  });
  const displayUis = useUiScripts({
    registry: displayUiRegistry,
    types: step.components
      .filter((component) => {
        return component.display === true;
      })
      .map((component) => {
        return component.type;
      }),
  });

  return match([componentUis, displayUis] as const)
    .with([{ status: 'ready' }, { status: 'ready' }], ([components, displays]) => {
      return <StepForm runId={runId} step={step} uis={components.uis} displayUis={displays.uis} />;
    })
    .with([{ status: 'error' }, { status: 'ready' }], [{ status: 'error' }, { status: 'loading' }], [{ status: 'error' }, { status: 'error' }], ([failed]) => {
      return <p className="text-sm text-red-600">{failed.message}</p>;
    })
    .with([{ status: 'ready' }, { status: 'error' }], [{ status: 'loading' }, { status: 'error' }], ([, failed]) => {
      return <p className="text-sm text-red-600">{failed.message}</p>;
    })
    .otherwise(() => {
      return <LoadingIndicator loading={{ label: 'Loading the form…', description: null, itemsInQueue: null, itemsCompleted: 0 }} />;
    });
};
