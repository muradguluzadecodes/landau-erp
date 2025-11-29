'use client';

import { Link, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TableDataHeader = ({
  setCopyLink,
  formId,
}: {
  copyLink: boolean;
  setCopyLink: (value: boolean) => void;
  formId: number | null;
}) => {
  const router = useRouter();

  const handleEdit = () => {
    if (formId) {
      router.push(`/application-form/new/${formId}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-4">
      <h3 className="text-[14px] font-semibold text-[#141414]">
        LES Admission Form
      </h3>
      <div className="flex items-center gap-2">
        <button onClick={() => setCopyLink(true)}>
          <Link size={20} />
        </button>
        <button onClick={handleEdit}>
          <Pencil size={20} />
        </button>
        <button>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TableDataHeader;
