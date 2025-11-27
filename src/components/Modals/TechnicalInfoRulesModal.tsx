'use client';

import { Modal } from 'antd';

import { MainBtn } from '../MainBtn';
import { RichTextEditor } from '@/widgets/richText/RichTextEditor';

type TechnicalInfoRulesModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export default function TechnicalInfoRulesModal({
  isOpenModal,
  setIsOpenModal,
}: TechnicalInfoRulesModalProps) {
  const handleRulesChange = () => {
    // TODO: persist rules value once API is ready
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
        <RichTextEditor onValueChange={handleRulesChange} />
        <div className="flex gap-4">
          <MainBtn
            variant="outline"
            text="Geri"
            className="w-full"
            onClick={() => setIsOpenModal(false)}
          />
          <MainBtn className="w-full" text="Yadda saxla" />
        </div>
      </div>
    </Modal>
  );
}
