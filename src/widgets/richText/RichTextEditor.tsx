'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Editor, createEditor, type Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
  type RenderPlaceholderProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import type { ChangeEvent } from 'react';

import { RichTextToolbar } from './RichTextToolbar';
import { RichTextElement, RichTextLeaf } from './RichTextElements';
import type { RichTextValue } from './types';

type RichTextEditorProps = {
  placeholder?: string;
  className?: string;
  initialValue?: RichTextValue;
  onValueChange?: (value: RichTextValue) => void;
};

const DEFAULT_PLACEHOLDER = 'Mətninizi daxil edin...';
const BASE_EDITOR_CLASSNAME =
  'relative w-full rounded-[24px] border border-[#E7E7E7] bg-[#FCFCFC] p-5 h-[240px] overflow-y-scroll focus:outline-none';

const createInitialValue = (): Descendant[] => [
  {
    type: 'paragraph',
    textAlign: 'left',
    children: [{ text: '' }],
  },
];

export const RichTextEditor = ({
  placeholder = DEFAULT_PLACEHOLDER,
  className,
  initialValue,
  onValueChange,
}: RichTextEditorProps) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [value, setValue] = useState<Descendant[]>(
    () => initialValue ?? createInitialValue(),
  );
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const combinedClassName = useMemo(() => {
    if (!className) return BASE_EDITOR_CLASSNAME;
    return `${BASE_EDITOR_CLASSNAME} ${className}`;
  }, [className]);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <RichTextElement {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <RichTextLeaf {...props} />;
  }, []);

  const renderPlaceholder = useCallback((props: RenderPlaceholderProps) => {
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
      if (!event.target.value) return;
      Editor.addMark(editor, 'color', event.target.value);
    },
    [editor],
  );

  const triggerColorPicker = useCallback(() => {
    colorPickerRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
      <RichTextToolbar
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
        className={combinedClassName}
        placeholder={placeholder}
      />
    </Slate>
  );
};
