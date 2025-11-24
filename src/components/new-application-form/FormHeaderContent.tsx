import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FormHeaderContent() {
  return (
    <div className="flex justify-center flex-col gap-8">
      <Link href={'/application-form'}>
        <ArrowLeft size={24} />
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium text-[#141414]">
          Müraciət formu yarat
        </h1>
        <p className="text-[14px] font-regular text-[#555555]">
          Xanaları dolduraraq yeni müraciət formu yarada bilərsiniz!
        </p>
      </div>
    </div>
  );
}
