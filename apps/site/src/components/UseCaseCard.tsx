import type { UseCase } from '../types/UseCase';
import type { FC } from 'react';

export type UseCaseCardProps = {
  useCase: UseCase;
};

export const UseCaseCard: FC<UseCaseCardProps> = ({ useCase }) => {
  const Icon = useCase.icon;

  return (
    <article className="flex flex-col gap-3 offset-card bg-white p-6">
      <Icon />
      <h3 className="text-lg font-semibold tracking-[-0.02em]">{useCase.title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{useCase.description}</p>
    </article>
  );
};
