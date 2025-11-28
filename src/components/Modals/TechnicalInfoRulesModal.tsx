'use client';

import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import { MainBtn } from '../MainBtn';
import { useApplicationFormStore } from '@/store/useApplicationFormStore';
import { RichTextEditor } from '@/widgets/richText/RichTextEditor';

import type { RichTextValue } from '@/widgets/richText/types';

type TechnicalInfoRulesModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  ruleKey?: 'rules_text_az' | 'rules_text_ru' | 'rules_text_en';
};

export default function TechnicalInfoRulesModal({
  isOpenModal,
  setIsOpenModal,
  ruleKey = 'rules_text_az',
}: TechnicalInfoRulesModalProps) {
  const { technicalInfo, setTechnicalInfoField } = useApplicationFormStore();
  const [currentValue, setCurrentValue] = useState<RichTextValue | undefined>(
    undefined,
  );

  // Update current value when modal opens or ruleKey changes
  useEffect(() => {
    if (isOpenModal) {
      // Try to parse stored value if it exists, otherwise use default
      const storedValue = technicalInfo[ruleKey];
      if (storedValue && typeof storedValue === 'string') {
        try {
          const parsed = JSON.parse(storedValue) as RichTextValue;
          setCurrentValue(parsed);
        } catch {
          // If parsing fails, use default
          setCurrentValue(undefined);
        }
      } else {
        setCurrentValue(undefined);
      }
    }
  }, [isOpenModal, ruleKey, technicalInfo]);

  const handleRulesChange = (value: RichTextValue) => {
    setCurrentValue(value);
  };

  const handleSave = () => {
    if (currentValue) {
      // Store as JSON string
      setTechnicalInfoField(ruleKey, JSON.stringify(currentValue));
    }
    setIsOpenModal(false);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Qaydalar"
      onCancel={() => setIsOpenModal(false)}
      footer={[]}
      width={800}
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[14px] font-regular text-[#555555]">
            Aşağı xanaya qaydaları (Azərbaycanca) əlavə edin.
          </p>
        </div>
        <RichTextEditor
          onValueChange={handleRulesChange}
          initialValue={currentValue}
        />
        <div className="flex gap-4">
          <MainBtn
            variant="outline"
            text="Geri"
            className="w-full"
            onClick={() => setIsOpenModal(false)}
          />
          <MainBtn className="w-full" text="Yadda saxla" onClick={handleSave} />
        </div>
      </div>
    </Modal>
  );
}
