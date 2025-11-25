import { ArrowLeft, Copy } from 'lucide-react';
import FloatInput from '../FloatInput';

export default function TableDataCopyLink({
  setCopyLink,
  slug,
}: {
  setCopyLink: (value: boolean) => void;
  slug: string;
}) {
  return (
    <div className="p-4 border-t border-b border-[#DFDFDF] flex flex-col gap-5">
      <div className="flex items-center gap-1">
        <button onClick={() => setCopyLink(false)}>
          <ArrowLeft size={20} />
        </button>
        <span className="text-[14px] font-medium text-[#141414]">
          Go to back
        </span>
      </div>
      <FloatInput
        type="text"
        label=""
        value={`https://erp.leg.az/${slug}`}
        onChange={() => {}}
        containerClassName=""
        rightIcon={<Copy size={20} />}
        onRightIconClick={() => {
          navigator.clipboard.writeText(`https://erp.leg.az/${slug}`);
        }}
      />
    </div>
  );
}
