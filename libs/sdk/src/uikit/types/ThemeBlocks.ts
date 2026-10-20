import type { ButtonProps } from '../Button';
import type { ButtonRowProps } from '../ButtonRow';
import type { CardProps } from '../Card';
import type { CheckboxProps } from '../Checkbox';
import type { ChoiceListProps } from '../ChoiceList';
import type { FieldProps } from '../Field';
import type { HeadingProps } from '../Heading';
import type { HintProps } from '../Hint';
import type { InputProps } from '../Input';
import type { LabelProps } from '../Label';
import type { LinkProps } from '../Link';
import type { MetadataProps } from '../Metadata';
import type { MultiSelectProps } from '../MultiSelect';
import type { RowMenuProps } from '../RowMenu';
import type { SelectProps } from '../Select';
import type { TableProps } from '../Table';
import type { TextareaProps } from '../Textarea';
import type { ComponentType } from 'react';

// Everything a theme draws. The core only knows these props; a theme gives each block its look.
export type ThemeBlocks = {
  Button: ComponentType<ButtonProps>;
  ButtonRow: ComponentType<ButtonRowProps>;
  Card: ComponentType<CardProps>;
  Checkbox: ComponentType<CheckboxProps>;
  ChoiceList: ComponentType<ChoiceListProps>;
  Field: ComponentType<FieldProps>;
  Heading: ComponentType<HeadingProps>;
  Hint: ComponentType<HintProps>;
  Input: ComponentType<InputProps>;
  Label: ComponentType<LabelProps>;
  Link: ComponentType<LinkProps>;
  Metadata: ComponentType<MetadataProps>;
  MultiSelect: ComponentType<MultiSelectProps>;
  RowMenu: ComponentType<RowMenuProps>;
  Select: ComponentType<SelectProps>;
  Table: ComponentType<TableProps>;
  Textarea: ComponentType<TextareaProps>;
};
