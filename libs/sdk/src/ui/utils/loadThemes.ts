import { hostGlobalName } from '../../client/hostGlobalName';
import type { AwaitIOHost } from '../../client/types/AwaitIOHost';
import type { ThemeBlocks } from '../../uikit/types/ThemeBlocks';
import { fetchAppInfo } from '../api/fetchAppInfo';
import { themeUiRegistry } from '../themeUiRegistry';

// Loads the theme scripts before the UI draws anything and puts into window.__AWAITIO__.ui each block from the script
// the theme picked it from. Component scripts loaded afterwards see the final blocks.
export const loadThemes = async () => {
  const { themeBlocks } = await fetchAppInfo();
  const scripts = await Promise.all(
    [...new Set(Object.values(themeBlocks))].map(async (index) => {
      return [index, await themeUiRegistry.load(String(index))] as const;
    }),
  );
  const byIndex = new Map(scripts);
  const host = (window as unknown as Record<string, AwaitIOHost>)[hostGlobalName];
  Object.entries(themeBlocks).forEach(([name, index]) => {
    Object.assign(host.ui, { [name]: byIndex.get(index)?.blocks[name as keyof ThemeBlocks] });
  });
};
