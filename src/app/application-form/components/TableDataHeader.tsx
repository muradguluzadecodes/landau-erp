import { Link, Pencil, Trash2 } from 'lucide-react';

const TableDataHeader = ({
  setCopyLink,
}: {
  copyLink: boolean;
  setCopyLink: (value: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <h3 className="text-[14px] font-semibold text-[#141414]">
        LES Admission Form
      </h3>
      <div className="flex items-center gap-2">
        <button onClick={() => setCopyLink(true)}>
          <Link size={20} />
        </button>
        <button>
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
