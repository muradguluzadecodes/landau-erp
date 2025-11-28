'use client';

import type { RenderElementProps, RenderLeafProps } from 'slate-react';

export const RichTextElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
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

export const RichTextLeaf = ({
  attributes,
  children,
  leaf,
}: RenderLeafProps) => {
  let formattedChildren = children;

  if (leaf.bold) {
    formattedChildren = <strong>{formattedChildren}</strong>;
  }
  if (leaf.italic) {
    formattedChildren = <em>{formattedChildren}</em>;
  }
  if (leaf.underline) {
    formattedChildren = <u>{formattedChildren}</u>;
  }
  if (leaf.color) {
    formattedChildren = (
      <span style={{ color: leaf.color }}>{formattedChildren}</span>
    );
  }

  return <span {...attributes}>{formattedChildren}</span>;
};
