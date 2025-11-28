'use client';

import { Pencil } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';

import FloatInput from '../FloatInput';
import { UploadCloud } from '@/assets/icons/icons';
import {
  NEW_APPLICATION_FORM_CONFIRMATION_TEXTS,
  NEW_APPLICATION_FORM_RULES,
  NEW_APPLICATION_FORM_TECHNICAL_INFO,
} from '@/constants/newApplicationForm';

export default function TechnicalInfo({
  openTechnicalInfoRulesModal,
}: {
  openTechnicalInfoRulesModal: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      [
        ...NEW_APPLICATION_FORM_TECHNICAL_INFO,
        ...NEW_APPLICATION_FORM_CONFIRMATION_TEXTS,
        ...NEW_APPLICATION_FORM_RULES,
      ].map((item) => [item.key, '']),
    ),
  );

  const handleInputChange =
    (key: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setFormData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSelectChange = (key: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-[#f7f7f7] rounded-[16px] overflow-hidden p-8">
      <h3 className="text-[20px] font-semibold text-[#141414] mb-6">
        Texniki məlumatlar
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {NEW_APPLICATION_FORM_TECHNICAL_INFO.map((item) => (
          <FloatInput
            key={item.key}
            label={item.label}
            type={item.type}
            required={item.required}
            value={formData[item.key]}
            onChange={
              item.type === 'select' ? undefined : handleInputChange(item.key)
            }
            onSelectChange={
              item.type === 'select' ? handleSelectChange(item.key) : undefined
            }
            options={item.options}
          />
        ))}
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 auto-rows-fr">
          {NEW_APPLICATION_FORM_RULES.map((item) => (
            <div
              key={item.key}
              className="relative rounded-[24px] h-[200px] py-4 px-5 border border-[#CECECE]"
              onClick={() => openTechnicalInfoRulesModal(true)}
            >
              <p className="text-[14px] font-regular text-[#141414]">
                {item.label}
              </p>
              <span className="absolute right-6 bottom-4 text-[#555555]">
                <Pencil size={24} />
              </span>
            </div>
          ))}
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
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {NEW_APPLICATION_FORM_CONFIRMATION_TEXTS.map((item) => (
          <FloatInput
            key={item.key}
            label={item.label}
            type={item.type}
            required={item.required}
            value={formData[item.key]}
            onChange={handleInputChange(item.key)}
          />
        ))}
      </div>
    </div>
  );
}
