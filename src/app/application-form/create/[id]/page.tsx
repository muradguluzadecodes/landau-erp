'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import FormHeaderContent from '../../shared/components/FormHeaderContent';
import NewPage from '../../shared/components/NewPage';
import NoInfo from '../../shared/components/NoInfo';
import { MainBtn } from '@/components/MainBtn';
import { useApplicationFormStore } from '@/store/useApplicationFormStore';

export default function Page() {
  const params = useParams();
  const formId = params.id as string;
  const { pages, addPage, deletePage, setFormId } = useApplicationFormStore();

  // Initialize form ID in store
  useEffect(() => {
    setFormId(formId);
  }, [formId, setFormId]);

  const handleAddPage = () => {
    addPage();
  };

  const handleDeletePage = (pageId: string | number) => {
    deletePage(pageId);
  };

  const handleSubmit = () => {
    // TODO: Submit form data to API
    // After successful submit, clear storage
    // clearStorage();
  };

  return (
    <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
      <FormHeaderContent
        onAddPage={handleAddPage}
        backHref={`/application-form/new/${formId}`}
        isEditMode={true}
      />
      {pages.length === 0 ? (
        <NoInfo />
      ) : (
        <div className="flex flex-col gap-6">
          {pages.map((page) => (
            <NewPage
              key={page.id}
              pageId={page.id}
              pageNumber={page.order}
              onDelete={() => handleDeletePage(page.id)}
            />
          ))}
        </div>
      )}
      {pages.length > 0 && (
        <div className="flex justify-end">
          <MainBtn
            text="Yadda saxla"
            className="py-4 px-32"
            onClick={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
