'use client';

import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

interface FormHeaderContentProps {
  onAddPage?: () => void;
  backHref?: string;
  isEditMode?: boolean;
}

export default function FormHeaderContent({
  onAddPage,
  backHref = '/application-form',
  isEditMode = false,
}: FormHeaderContentProps) {
  const title = isEditMode
    ? 'Müraciət formu redaktə et'
    : 'Müraciət formu yarat';
  const description = isEditMode
    ? 'Mövcud müraciət formasını redaktə edə bilərsiniz!'
    : 'Xanaları dolduraraq yeni müraciət formu yarada bilərsiniz!';

  if (onAddPage) {
    return (
      <div className="flex items-end justify-between">
        <div className="flex justify-center flex-col gap-8">
          <Link href={backHref}>
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-[#141414]">{title}</h1>
            <p className="text-[14px] font-regular text-[#555555]">
              {description}
            </p>
          </div>
        </div>
        <button
          onClick={onAddPage}
          className="p-3 rounded-full bg-[#0044FF] hover:bg-[#0033CC] transition-colors"
        >
          <Plus size={24} color="white" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col gap-8">
      <Link href={backHref}>
        <ArrowLeft size={24} />
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium text-[#141414]">{title}</h1>
        <p className="text-[14px] font-regular text-[#555555]">{description}</p>
      </div>
    </div>
  );
}
