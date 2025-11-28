import { Plus } from 'lucide-react';

import { MainBtn } from '@/components/MainBtn';

export default function Page() {
  return (
    <div className="section">
      <h2 className="text-[24px] font-semibold mb-6">ERP icazələr</h2>
      <MainBtn text={<Plus />} />
    </div>
  );
}
