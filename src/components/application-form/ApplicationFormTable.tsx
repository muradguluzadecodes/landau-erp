'use client';

import ApplicationFormTableData from './ApplicationFormTableData';
import { ApplicationForm } from '@/lib/types';
import { useAllApplicationForm } from '@/queries/application-form/useAllApplicationForm';

function ApplicationFormTable() {
  const { data: formsData, isLoading } = useAllApplicationForm();
  const forms = formsData?.results ?? [];

  if (isLoading) {
    return <p>Yüklənir...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {forms.length > 0 &&
        forms.map((item: ApplicationForm, index: number) => (
          <ApplicationFormTableData
            key={item.id ?? `form-${index}`}
            {...item}
          />
        ))}
    </div>
  );
}

export default ApplicationFormTable;
