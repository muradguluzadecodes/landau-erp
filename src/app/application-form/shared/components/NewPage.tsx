'use client';

import { Plus, Trash2 } from 'lucide-react';

import NewCell from './NewCell';
import { useApplicationFormStore } from '@/store/useApplicationFormStore';

interface NewPageProps {
  pageId: string | number;
  pageNumber: number;
  onDelete?: () => void;
}

export default function NewPage({ pageId, pageNumber }: NewPageProps) {
  const { pages, addField, deleteField } = useApplicationFormStore();
  const page = pages?.find((p) => p.id === pageId);

  if (!page) {
    return null;
  }

  const handleAddField = () => {
    addField(pageId);
  };

  const handleDeleteField = (fieldId: string | number) => {
    deleteField(pageId, fieldId);
  };

  return (
    <div className="bg-[#F7F7F7] rounded-[16px] p-6 relative">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-semibold text-[#141414]">
          {pageNumber}ci səhifə
        </h3>
      </div>
      <div className="flex flex-col gap-6">
        {page?.fields?.map((field) => (
          <div
            key={field.id}
            className="border border-[#dfdfdf]! rounded-[24px] p-5"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => handleDeleteField(field.id)}
                aria-label="Field-i sil"
              >
                <Trash2 size={16} className="text-[#0044FF]" />
              </button>
            </div>
            <NewCell pageId={pageId} fieldId={field.id} />
          </div>
        ))}
      </div>

      {/* Add field button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAddField}
          className="flex items-center gap-2 text-[#0044FF] hover:text-[#0033CC] transition-colors"
        >
          <Plus size={20} />
          <span className="text-[14px] font-regular">Əlavə field əlavə et</span>
        </button>
      </div>
    </div>
  );
}
