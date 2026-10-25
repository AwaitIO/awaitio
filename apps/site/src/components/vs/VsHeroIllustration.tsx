import { AwaitCodeSketch } from './AwaitCodeSketch';
import { CanvasBuilderSketch } from './CanvasBuilderSketch';
import { HostedSdkSketch } from './HostedSdkSketch';
import { PythonFrameworkSketch } from './PythonFrameworkSketch';
import { ScriptsPlatformSketch } from './ScriptsPlatformSketch';
import type { ComparisonKind } from '../../types/ComparisonKind';
import { CodeText } from '../CodeText';
import type { FC } from 'react';

const sketches: Record<ComparisonKind, FC> = {
  canvas: CanvasBuilderSketch,
  scripts: ScriptsPlatformSketch,
  framework: PythonFrameworkSketch,
  sdk: HostedSdkSketch,
};

const captions: Record<ComparisonKind, string> = {
  canvas: 'Drag components onto a canvas, then wire each one to a query.',
  scripts: 'Write scripts on its platform, then build a UI on top of them.',
  framework: 'Write every page yourself: state, layout and handlers.',
  sdk: 'The same `await io` model, with the screens served from its own cloud.',
};

export type VsHeroIllustrationProps = {
  name: string;
  kind: ComparisonKind;
};

// The two ways side by side under the hero: how you build in the other tool, and the same task in AwaitIO.
export const VsHeroIllustration: FC<VsHeroIllustrationProps> = ({ name, kind }) => {
  const Sketch = sketches[kind];

  return (
    <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
      <figure className="flex min-w-0 flex-col gap-3">
        <div className="offset-card flex flex-1 flex-col overflow-hidden bg-white"><Sketch /></div>
        <figcaption className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{name}.</span> <CodeText text={captions[kind]} />
        </figcaption>
      </figure>
      <figure className="flex min-w-0 flex-col gap-3">
        <div className="offset-card flex flex-1 flex-col overflow-hidden bg-white">
          <AwaitCodeSketch />
        </div>
        <figcaption className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">AwaitIO.</span> Write the steps as a function. Every <code className="font-mono text-[0.9em]">await</code> becomes a form.
        </figcaption>
      </figure>
    </div>
  );
};
