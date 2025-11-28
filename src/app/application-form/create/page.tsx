'use client';

import { useState } from 'react';

import FormHeaderContent from '../shared/components/FormHeaderContent';
import NewPage from '../shared/components/NewPage';
import NoInfo from '../shared/components/NoInfo';
import { MainBtn } from '@/components/MainBtn';

export default function Page() {
  const [pages, setPages] = useState<{ id: number; pageNumber: number }[]>([]);

  const handleAddPage = () => {
    const newPageNumber = pages.length + 1;
    setPages((prev) => [
      ...prev,
      { id: Date.now(), pageNumber: newPageNumber },
    ]);
  };

  const handleDeletePage = (pageId: number) => {
    setPages((prev) => {
      const filtered = prev.filter((page) => page.id !== pageId);
      // Səhifə nömrələrini yenidən təyin et
      return filtered.map((page, index) => ({
        ...page,
        pageNumber: index + 1,
      }));
    });
  };

  return (
    <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
      <FormHeaderContent onAddPage={handleAddPage} />
      {pages.length === 0 ? (
        <NoInfo />
      ) : (
        <div className="flex flex-col gap-6">
          {pages.map((page) => (
            <NewPage
              key={page.id}
              pageNumber={page.pageNumber}
              onDelete={() => handleDeletePage(page.id)}
            />
          ))}
        </div>
      )}
      {pages.length > 0 && (
        <div className="flex justify-end">
          <MainBtn text="Yarat" className="py-4 px-32" onClick={() => {}} />
        </div>
      )}
    </div>
  );
}
