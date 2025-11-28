'use client';

import { Editor, Transforms } from 'slate';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  OrderedList,
  Palette,
  Underline,
  UnorderedList,
  Uppercase,
} from '@/assets/icons/icons';

import type {
  BlockFormat,
  CustomElement,
  ListElement,
  MarkFormat,
  TextAlign,
} from './types';
import type { MouseEvent, ReactNode } from 'react';

const LIST_TYPES: BlockFormat[] = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES: TextAlign[] = ['left', 'center', 'right'];

const isMarkActive = (editor: Editor, format: MarkFormat): boolean => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, unknown>)[format] === true : false;
};

const toggleMark = (editor: Editor, format: MarkFormat): void => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: Editor,
  format: BlockFormat | TextAlign,
  blockProperty: 'type' | 'textAlign' = 'type',
): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      if (!Editor.isBlock(editor, n as CustomElement)) return false;
      return (
        (n as Record<'type' | 'textAlign', unknown>)[blockProperty] === format
      );
    },
  });

  return Boolean(match);
};

const toggleBlock = (editor: Editor, format: BlockFormat | TextAlign): void => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format as TextAlign) ? 'textAlign' : 'type',
  );
  const isList = LIST_TYPES.includes(format as BlockFormat);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      Editor.isBlock(editor, n as CustomElement) &&
      LIST_TYPES.includes((n as { type: BlockFormat }).type),
    split: true,
  });

  let newProperties: Partial<CustomElement>;

  if (TEXT_ALIGN_TYPES.includes(format as TextAlign)) {
    newProperties = {
      textAlign: isActive ? undefined : (format as TextAlign),
    };
  } else {
    newProperties = {
      type: isActive
        ? 'paragraph'
        : isList
          ? 'list-item'
          : (format as BlockFormat),
    };
  }

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block: ListElement = {
      type: format as ListElement['type'],
      textAlign: undefined,
      children: [],
    };
    Transforms.wrapNodes(editor, block);
  }
};

const transformSelectionToUppercase = (editor: Editor): void => {
  if (!editor.selection) return;
  const selectedText = Editor.string(editor, editor.selection);
  if (!selectedText) return;

  Transforms.delete(editor);
  Transforms.insertText(editor, selectedText.toUpperCase());
};

const ToolbarButton = ({
  onMouseDown,
  children,
}: {
  onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) => {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      className="p-[10px] border rounded-full border-[#E7E7E7] bg-[#FCFCFC] hover:fill-[#0044FF] hover:bg-[#E7EDFF] hover:border-[#0044FF] cursor-pointer transition-all duration-300"
    >
      {children}
    </button>
  );
};

type RichTextToolbarProps = {
  editor: Editor;
  triggerColorPicker: () => void;
};

export const RichTextToolbar = ({
  editor,
  triggerColorPicker,
}: RichTextToolbarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, 'bold');
          }}
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, 'underline');
          }}
        >
          <Underline />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, 'italic');
          }}
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            transformSelectionToUppercase(editor);
          }}
        >
          <Uppercase />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            triggerColorPicker();
          }}
        >
          <Palette />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, 'bulleted-list');
          }}
        >
          <UnorderedList />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, 'numbered-list');
          }}
        >
          <OrderedList />
        </ToolbarButton>
      </div>
      <div className="flex gap-2">
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, 'left');
          }}
        >
          <AlignLeft />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, 'center');
          }}
        >
          <AlignCenter />
        </ToolbarButton>
        <ToolbarButton
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, 'right');
          }}
        >
          <AlignRight />
        </ToolbarButton>
      </div>
    </div>
  );
};
