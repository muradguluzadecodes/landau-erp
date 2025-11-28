import { Modal } from 'antd';
import React from 'react';

import { MainBtn } from '../MainBtn';

export default function BannerDeleteModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}) {
  return (
    <Modal
      open={isOpenModal}
      title="Silməyə əminsiniz?"
      onCancel={() => setIsOpenModal(false)}
      footer={[]}
    >
      <p className="text-[14px] font-regular text-[#555555]">
        Banneri silməyə əminsiniz?
      </p>

      <div className="flex gap-4 mt-6">
        <MainBtn
          variant="outline"
          text="Geri"
          className="w-full"
          onClick={() => setIsOpenModal(false)}
        />
        <MainBtn
          className="w-full"
          text="Sil"
          // onClick={handleSubmit}
          // isLoading={isPending}
        />
      </div>
    </Modal>
  );
}
