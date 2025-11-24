'use client';
import TechnicalInfoRulesModal from '@/components/Modals/TechnicalInfoRulesModal';
import FormHeaderContent from '@/components/new-application-form/FormHeaderContent';
import TechnicalInfo from '@/components/new-application-form/TechnicalInfo';
import { useState } from 'react';

export default function Page() {
  const [isOpenTechnicalInfoRulesModal, setIsOpenTechnicalInfoRulesModal] = useState(false);
  return (
    <>
      <TechnicalInfoRulesModal isOpenModal={isOpenTechnicalInfoRulesModal} setIsOpenModal={setIsOpenTechnicalInfoRulesModal} />

      <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
        <FormHeaderContent />
        <TechnicalInfo openTechnicalInfoRulesModal={setIsOpenTechnicalInfoRulesModal} />
        <div className="flex justify-end">
          <button className="bg-[#0044FF] text-white text-[16px] font-regular py-4 rounded-[100px] w-[30%]">
            Növbəti
          </button>
        </div>
      </div>
    </>
  );
}
