import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationFormHead() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-[#141414]">Müraciət form</h1>
      <Link
        href="/application-form/new"
        className="p-3 rounded-full bg-[#0044FF]"
      >
        <Plus size={24} color="white" />
      </Link>
    </div>
  );
}
