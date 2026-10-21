import { match } from 'ts-pattern';
import type { BrandAsset } from './BrandAsset';
import { Lockup } from '../logos/Lockup';
import type { FC } from 'react';

export type BrandAssetCardProps = {
  asset: BrandAsset;
};

export const BrandAssetCard: FC<BrandAssetCardProps> = ({ asset }) => {
  const { Mark } = asset;
  const isDark = asset.tone === 'dark';

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className={['flex h-44 items-center justify-center', isDark && 'bg-[#111827]', !isDark && 'bg-white'].filter(Boolean).join(' ')}>
        {match(asset.kind)
          .with('icon', () => {
            return <Mark size={88} tone={asset.tone} />;
          })
          .with('lockup', () => {
            return <Lockup size={56} tone={asset.tone} Mark={Mark} />;
          })
          .exhaustive()}
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-gray-200 p-5">
        <h3 className="font-semibold">{asset.name}</h3>
        <p className="text-sm text-gray-600">{asset.description}</p>
        <div className="mt-auto flex gap-2 pt-1">
          {['svg', 'png'].map((extension) => {
            return (
              <a
                key={extension}
                href={`/branding/${asset.file}.${extension}`}
                download
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium uppercase text-gray-700 hover:bg-gray-50"
              >
                {extension}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
};
