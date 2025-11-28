'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormHeaderContent from '../shared/components/FormHeaderContent';
import TechnicalInfo from '../shared/components/TechnicalInfo';
import { MainBtn } from '@/components/MainBtn';
import BannerDeleteModal from '@/components/Modals/BannerDeleteModal';
import TechnicalInfoRulesModal from '@/components/Modals/TechnicalInfoRulesModal';

export default function Page() {
  const router = useRouter();
  const [isOpenTechnicalInfoRulesModal, setIsOpenTechnicalInfoRulesModal] =
    useState(false);
  const [isOpenBannerDeleteModal, setIsOpenBannerDeleteModal] = useState(false);
  return (
    <>
      <TechnicalInfoRulesModal
        isOpenModal={isOpenTechnicalInfoRulesModal}
        setIsOpenModal={setIsOpenTechnicalInfoRulesModal}
      />
      <BannerDeleteModal
        isOpenModal={isOpenBannerDeleteModal}
        setIsOpenModal={setIsOpenBannerDeleteModal}
      />

      <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
        <FormHeaderContent />
        <TechnicalInfo
          openTechnicalInfoRulesModal={setIsOpenTechnicalInfoRulesModal}
          openBannerDeleteModal={setIsOpenBannerDeleteModal}
        />
        <div className="flex justify-end">
          <MainBtn
            text="Növbəti"
            className="py-4 px-32"
            onClick={() => router.push('/application-form/create')}
          />
        </div>
      </div>
    </>
  );
}
