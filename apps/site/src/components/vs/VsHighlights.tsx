import { AppSketch } from './AppSketch';
import { AwaitFormSketch } from './AwaitFormSketch';
import { OwnedSketch } from './OwnedSketch';
import { PriceSketch } from './PriceSketch';
import { RepoSketch } from './RepoSketch';
import { ReviewSketch } from './ReviewSketch';
import { ServicesSketch } from './ServicesSketch';
import { TypesSketch } from './TypesSketch';
import type { ComparisonHighlight } from '../../types/ComparisonHighlight';
import type { ComparisonIllustration } from '../../types/ComparisonIllustration';
import { CodeText } from '../CodeText';
import { FadeIn } from '../motion/FadeIn';
import type { FC } from 'react';

export type VsHighlightsProps = {
  highlights: ComparisonHighlight[];
};

const sketches: Record<ComparisonIllustration, FC> = {
  repo: RepoSketch,
  await: AwaitFormSketch,
  app: AppSketch,
  owned: OwnedSketch,
  types: TypesSketch,
  review: ReviewSketch,
  services: ServicesSketch,
  price: PriceSketch,
};

// Reasons in rows of four, each a drawing on a sand panel with a bold lead-in and one or two sentences under it.
export const VsHighlights: FC<VsHighlightsProps> = ({ highlights }) => {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {highlights.map((highlight, index) => {
        const Sketch = sketches[highlight.illustration];

        return (
          <FadeIn key={highlight.title} className="flex min-w-0 flex-col gap-4" delay={(index % 4) * 0.1}>
            <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl border-[1.5px] border-gray-900/10 bg-gray-100 p-4">
              <Sketch />
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{highlight.title}</span> <CodeText text={highlight.body} />
            </p>
          </FadeIn>
        );
      })}
    </div>
  );
};
