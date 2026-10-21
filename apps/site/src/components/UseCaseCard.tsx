import { FeatureIcon } from './FeatureIcon';
import type { UseCase } from '../types/UseCase';
import type { FC } from 'react';

export type UseCaseCardProps = {
  useCase: UseCase;
};

export const UseCaseCard: FC<UseCaseCardProps> = ({ useCase }) => {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6">
      <FeatureIcon>
        {useCase.iconPaths.map((path) => {
          return <path key={path} d={path} />;
        })}
      </FeatureIcon>
      <h3 className="text-lg font-semibold tracking-[-0.02em]">{useCase.title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{useCase.description}</p>
    </article>
  );
};
