'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FormHeaderContent from '../../shared/components/FormHeaderContent';
import TechnicalInfo from '../../shared/components/TechnicalInfo';
import { MainBtn } from '@/components/MainBtn';
import BannerDeleteModal from '@/components/Modals/BannerDeleteModal';
import TechnicalInfoRulesModal from '@/components/Modals/TechnicalInfoRulesModal';
import { useApplicationFormById } from '@/queries/application-form/useApplicationFormById';
import { useApplicationFormStore } from '@/store/useApplicationFormStore';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const formId = params.id as string;
  const [isOpenTechnicalInfoRulesModal, setIsOpenTechnicalInfoRulesModal] =
    useState(false);
  const [isOpenBannerDeleteModal, setIsOpenBannerDeleteModal] = useState(false);
  const [currentRuleKey, setCurrentRuleKey] = useState<
    'rules_text_az' | 'rules_text_ru' | 'rules_text_en'
  >('rules_text_az');

  const {
    setFormId,
    initializeFromApi,
    isInitialized,
    formId: storeFormId,
    initializedFormId,
    reset,
  } = useApplicationFormStore();
  const { data: apiData } = useApplicationFormById(formId);

  // Initialize form ID in store and reset if formId changes
  useEffect(() => {
    if (storeFormId !== formId) {
      // Form ID changed, reset the store
      reset();
      setFormId(formId);
    } else {
      setFormId(formId);
    }
  }, [formId, setFormId, storeFormId, reset]);

  // Load data from API when available
  useEffect(() => {
    // Only initialize if:
    // 1. API data is available
    // 2. Store formId matches current formId
    // 3. Either not initialized yet, or initialized for a different formId
    if (
      apiData &&
      storeFormId === formId &&
      (initializedFormId !== formId || !isInitialized)
    ) {
      initializeFromApi(apiData);
    }
  }, [
    apiData,
    isInitialized,
    initializeFromApi,
    formId,
    storeFormId,
    initializedFormId,
  ]);

  return (
    <>
      <TechnicalInfoRulesModal
        isOpenModal={isOpenTechnicalInfoRulesModal}
        setIsOpenModal={setIsOpenTechnicalInfoRulesModal}
        ruleKey={currentRuleKey}
      />
      <BannerDeleteModal
        isOpenModal={isOpenBannerDeleteModal}
        setIsOpenModal={setIsOpenBannerDeleteModal}
      />

      <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
        <FormHeaderContent backHref="/application-form" isEditMode={true} />
        <TechnicalInfo
          openTechnicalInfoRulesModal={(open, ruleKey) => {
            if (ruleKey) setCurrentRuleKey(ruleKey);
            setIsOpenTechnicalInfoRulesModal(open);
          }}
          openBannerDeleteModal={setIsOpenBannerDeleteModal}
        />
        <div className="flex justify-end">
          <MainBtn
            text="Növbəti"
            className="py-4 px-32"
            onClick={() => router.push(`/application-form/create/${formId}`)}
          />
        </div>
      </div>
    </>
  );
}
