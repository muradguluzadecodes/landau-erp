'use client';

import { Modal } from 'antd';
import { useCallback, useRef, useState } from 'react';
import {
  BaseEditor,
  Descendant,
  Editor,
  Transforms,
  createEditor,
} from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { MainBtn } from '../MainBtn';
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

import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import type {
  RenderElementProps,
  RenderLeafProps,
  RenderPlaceholderProps,
} from 'slate-react';

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
};

type ParagraphElement = {
  type: 'paragraph';
  textAlign?: TextAlign;
  children: Descendant[];
};

type ListElement = {
  type: 'numbered-list' | 'bulleted-list';
  textAlign?: TextAlign;
  children: Descendant[];
};

type ListItemElement = {
  type: 'list-item';
  textAlign?: TextAlign;
  children: Descendant[];
};

type CustomElement = ParagraphElement | ListElement | ListItemElement;

type TextAlign = 'left' | 'center' | 'right';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type MarkFormat = 'bold' | 'italic' | 'underline';
type BlockFormat = 'numbered-list' | 'bulleted-list' | 'paragraph';

const LIST_TYPES: BlockFormat[] = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES: TextAlign[] = ['left', 'center', 'right'];

const createInitialValue = (): Descendant[] => [
  // Ensures the editor starts with a single empty left-aligned paragraph.
  {
    type: 'paragraph',
    textAlign: 'left',
    children: [{ text: '' }],
  },
];

const isMarkActive = (editor: Editor, format: MarkFormat): boolean => {
  // Checks whether the current selection already contains the requested text mark.
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, unknown>)[format] === true : false;
};

const toggleMark = (editor: Editor, format: MarkFormat): void => {
  // Toggles bold/italic/underline marks on the current selection.
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
  // Detects whether the current block already matches the given type or alignment.
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
  // Switches between paragraph/list blocks or updates alignment while keeping structure valid.
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
  // Replaces the current selection with an uppercase version of itself.
  if (!editor.selection) return;
  const selectedText = Editor.string(editor, editor.selection);
  if (!selectedText) return;

  Transforms.delete(editor);
  Transforms.insertText(editor, selectedText.toUpperCase());
};

const applyColorMark = (editor: Editor, color: string): void => {
  // Assigns the selected color mark to future text input.
  Editor.addMark(editor, 'color', color);
};

const ToolbarButton = ({
  onMouseDown,
  children,
}: {
  onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) => {
  // Provides consistent styling/behavior for toolbar buttons.
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

const SlateToolbar = ({
  editor,
  triggerColorPicker,
}: {
  editor: Editor;
  triggerColorPicker: () => void;
}) => {
  // Renders all text-formatting controls tied to the Slate editor instance.
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

const Element = ({ attributes, children, element }: RenderElementProps) => {
  // Maps Slate element types into semantic HTML nodes with proper styling.
  const style = { textAlign: element.textAlign };
  switch (element.type) {
    case 'numbered-list':
      return (
        <ol className="pl-6 list-decimal" style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'bulleted-list':
      return (
        <ul className="pl-6 list-disc" style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  // Applies inline formatting (marks) such as bold, italic, underline, color.
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};

export default function TechnicalInfoRulesModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}) {
  // Hosts the modal with the rich-text editor used to capture technical rules.
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [value, setValue] = useState<Descendant[]>(() => createInitialValue());
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const renderElement = useCallback((props: RenderElementProps) => {
    // Delegates block rendering to the Element component for consistency.
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    // Delegates inline mark rendering to the Leaf component.
    return <Leaf {...props} />;
  }, []);

  const renderPlaceholder = useCallback((props: RenderPlaceholderProps) => {
    // Customizes the placeholder position so it mimics a floating label.
    return (
      <span
        {...props.attributes}
        className="pointer-events-none text-[#B0B0B0]"
        style={{
          ...props.attributes.style,
          position: 'absolute',
          top: 20,
          left: 20,
        }}
      >
        {props.children}
      </span>
    );
  }, []);

  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // Applies a new color mark whenever the hidden color input picks a value.
      if (!event.target.value) return;
      applyColorMark(editor, event.target.value);
    },
    [editor],
  );

  const triggerColorPicker = useCallback(() => {
    colorPickerRef.current?.click();
  }, []);

  return (
    <Modal
      open={isOpenModal}
      title="Qaydalar"
      onCancel={() => setIsOpenModal(false)}
      footer={[]}
      width={800}
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[14px] font-regular text-[#555555]">
            Aşağı xanaya qaydaları (Azərbaycanca) əlavə edin.
          </p>
        </div>
        <Slate
          editor={editor}
          initialValue={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <SlateToolbar
            editor={editor}
            triggerColorPicker={triggerColorPicker}
          />
          <input
            ref={colorPickerRef}
            type="color"
            className="hidden"
            onChange={handleColorChange}
            aria-label="Rəng seç"
          />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            renderPlaceholder={renderPlaceholder}
            className="relative w-full rounded-[24px] border border-[#E7E7E7] bg-[#FCFCFC] p-5 h-[240px] focus:outline-none"
            placeholder="Mətninizi daxil edin..."
          />
        </Slate>
        <div className="flex gap-4">
          <MainBtn
            variant="outline"
            text="Geri"
            className="w-full"
            onClick={() => setIsOpenModal(false)}
          />
          <MainBtn className="w-full" text="Yadda saxla" />
        </div>
      </div>
    </Modal>
  );
}
