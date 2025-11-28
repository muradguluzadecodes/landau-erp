import { UploadCloud } from 'lucide-react';
import React from 'react';

export default function BannerUploadPlaceholder() {
  return (
    <div className="border border-[#909090] border-dashed rounded-[24px] py-8 px-5">
      <div className="flex flex-col items-center justify-center">
        <UploadCloud />
        <div className="flex flex-col gap-3 items-center">
          <p className="text-[14px] font-regular text-[#141414]">
            Banner <span className="text-error">*</span>
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium text-[#141414]">
              Faylı seçin və ya sürüşdürüb buraxın
            </p>
            <p className="text-[14px] font-regular text-[#555555]">
              Suppported formats: JPEG (750x200)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
