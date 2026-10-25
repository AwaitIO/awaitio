import { ArrowIcon } from '../../icons/ArrowIcon';
import { BlocksIcon } from '../../icons/BlocksIcon';
import { BuildingIcon } from '../../icons/BuildingIcon';
import { ChartIcon } from '../../icons/ChartIcon';
import { CheckBadgeIcon } from '../../icons/CheckBadgeIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { CircleCheckIcon } from '../../icons/CircleCheckIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import { CodeFolderIcon } from '../../icons/CodeFolderIcon';
import { CrossBadgeIcon } from '../../icons/CrossBadgeIcon';
import { CrossIcon } from '../../icons/CrossIcon';
import { CrowdIcon } from '../../icons/CrowdIcon';
import { CursorIcon } from '../../icons/CursorIcon';
import { GitHubIcon } from '../../icons/GitHubIcon';
import { HeadsetIcon } from '../../icons/HeadsetIcon';
import { HeartIcon } from '../../icons/HeartIcon';
import { LayersIcon } from '../../icons/LayersIcon';
import { LayoutIcon } from '../../icons/LayoutIcon';
import { LockIcon } from '../../icons/LockIcon';
import { MenuIcon } from '../../icons/MenuIcon';
import { PartialBadgeIcon } from '../../icons/PartialBadgeIcon';
import { PauseIcon } from '../../icons/PauseIcon';
import { PlayIcon } from '../../icons/PlayIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { ReplayIcon } from '../../icons/ReplayIcon';
import { TeamIcon } from '../../icons/TeamIcon';
import { TerminalIcon } from '../../icons/TerminalIcon';
import { TypeScriptIcon } from '../../icons/TypeScriptIcon';
import { UserIcon } from '../../icons/UserIcon';
import { XIcon } from '../../icons/XIcon';
import type { IconProps } from '../../types/IconProps';
import type { FC } from 'react';

// Every icon of src/icons, shown on /brand in all three sizes.
export const brandIcons: { name: string; Icon: FC<IconProps> }[] = [
  { name: 'Arrow', Icon: ArrowIcon },
  { name: 'Blocks', Icon: BlocksIcon },
  { name: 'Building', Icon: BuildingIcon },
  { name: 'Chart', Icon: ChartIcon },
  { name: 'CheckBadge', Icon: CheckBadgeIcon },
  { name: 'Check', Icon: CheckIcon },
  { name: 'CircleCheck', Icon: CircleCheckIcon },
  { name: 'Close', Icon: CloseIcon },
  { name: 'CodeFolder', Icon: CodeFolderIcon },
  { name: 'CrossBadge', Icon: CrossBadgeIcon },
  { name: 'Cross', Icon: CrossIcon },
  { name: 'Crowd', Icon: CrowdIcon },
  { name: 'Cursor', Icon: CursorIcon },
  { name: 'GitHub', Icon: GitHubIcon },
  { name: 'Headset', Icon: HeadsetIcon },
  { name: 'Heart', Icon: HeartIcon },
  { name: 'Layers', Icon: LayersIcon },
  { name: 'Layout', Icon: LayoutIcon },
  { name: 'Lock', Icon: LockIcon },
  { name: 'Menu', Icon: MenuIcon },
  { name: 'PartialBadge', Icon: PartialBadgeIcon },
  { name: 'Pause', Icon: PauseIcon },
  { name: 'Play', Icon: PlayIcon },
  { name: 'Plus', Icon: PlusIcon },
  { name: 'Replay', Icon: ReplayIcon },
  { name: 'Team', Icon: TeamIcon },
  { name: 'Terminal', Icon: TerminalIcon },
  { name: 'TypeScript', Icon: TypeScriptIcon },
  { name: 'User', Icon: UserIcon },
  { name: 'X', Icon: XIcon },
];
