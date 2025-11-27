import type { BaseEditor, Descendant } from 'slate';
import type { HistoryEditor } from 'slate-history';

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
};

export type ParagraphElement = {
  type: 'paragraph';
  textAlign?: TextAlign;
  children: Descendant[];
};

export type ListElement = {
  type: 'numbered-list' | 'bulleted-list';
  textAlign?: TextAlign;
  children: Descendant[];
};

export type ListItemElement = {
  type: 'list-item';
  textAlign?: TextAlign;
  children: Descendant[];
};

export type CustomElement = ParagraphElement | ListElement | ListItemElement;

export type TextAlign = 'left' | 'center' | 'right';

export type MarkFormat = 'bold' | 'italic' | 'underline';
export type BlockFormat = 'numbered-list' | 'bulleted-list' | 'paragraph';

export type RichTextValue = Descendant[];

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
