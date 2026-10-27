import { AlertIcon } from '../icons/AlertIcon';
import { BlocksIcon } from '../icons/BlocksIcon';
import { BracketsIcon } from '../icons/BracketsIcon';
import { ButtonsIcon } from '../icons/ButtonsIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { CheckboxIcon } from '../icons/CheckboxIcon';
import { ClearIcon } from '../icons/ClearIcon';
import { ClockIcon } from '../icons/ClockIcon';
import { CopyIcon } from '../icons/CopyIcon';
import { DatabaseIcon } from '../icons/DatabaseIcon';
import { DefaultValueIcon } from '../icons/DefaultValueIcon';
import { DotsIcon } from '../icons/DotsIcon';
import { FormIcon } from '../icons/FormIcon';
import { HashIcon } from '../icons/HashIcon';
import { HeadingIcon } from '../icons/HeadingIcon';
import { HelpIcon } from '../icons/HelpIcon';
import { ImageIcon } from '../icons/ImageIcon';
import { InboxIcon } from '../icons/InboxIcon';
import { LayoutIcon } from '../icons/LayoutIcon';
import { LinkIcon } from '../icons/LinkIcon';
import { ListIcon } from '../icons/ListIcon';
import { LockIcon } from '../icons/LockIcon';
import { MailIcon } from '../icons/MailIcon';
import { NextIcon } from '../icons/NextIcon';
import { OptionalIcon } from '../icons/OptionalIcon';
import { PaletteIcon } from '../icons/PaletteIcon';
import { ReturnIcon } from '../icons/ReturnIcon';
import { RulerIcon } from '../icons/RulerIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { SelectIcon } from '../icons/SelectIcon';
import { ServerIcon } from '../icons/ServerIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { StopIcon } from '../icons/StopIcon';
import { TextIcon } from '../icons/TextIcon';
import { TilesIcon } from '../icons/TilesIcon';
import { TreeIcon } from '../icons/TreeIcon';
import type { ComponentOptionIcon } from '../types/ComponentOptionIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

// The icon component for every key of `ComponentOptionIcon`.
export const componentOptionIcons: Record<ComponentOptionIcon, FC<IconProps>> = {
  help: HelpIcon,
  default: DefaultValueIcon,
  optional: OptionalIcon,
  validate: ShieldCheckIcon,
  server: ServerIcon,
  limits: RulerIcon,
  returns: ReturnIcon,
  database: DatabaseIcon,
  group: FormIcon,
  link: LinkIcon,
  style: PaletteIcon,
  empty: InboxIcon,
  list: ListIcon,
  search: SearchIcon,
  heading: HeadingIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  code: BracketsIcon,
  buttons: ButtonsIcon,
  stop: StopIcon,
  next: NextIcon,
  mail: MailIcon,
  image: ImageIcon,
  text: TextIcon,
  tiles: TilesIcon,
  tree: TreeIcon,
  copy: CopyIcon,
  menu: DotsIcon,
  error: AlertIcon,
  number: HashIcon,
  select: SelectIcon,
  clear: ClearIcon,
  checkbox: CheckboxIcon,
  lock: LockIcon,
  blocks: BlocksIcon,
  page: LayoutIcon,
};
