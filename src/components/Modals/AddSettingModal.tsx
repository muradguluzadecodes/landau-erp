'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { createNewSetting } from '@/api/settings/createNewSetting';
import { SettingsEnum } from '@/lib/enums';
import { SettingsVariants } from '@/lib/types';

export const AddSettingModal = ({
  isOpenModal,
  setIsOpenModal,
  type,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  type: SettingsVariants;
}) => {
  const [name, setName] = useState('');
  const modalTitle = `Yeni ${SettingsEnum[type].toLocaleLowerCase()} yarat`;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNewSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings', type],
      });
      setName('');
      setIsOpenModal(false);
    },
  });

  const handleClose = () => {
    setIsOpenModal(false);
    setName('');
  };

  const handleSubmit = () => {
    mutate({ type, name });
  };

  return (
    <Modal
      open={isOpenModal}
      title={modalTitle}
      onCancel={handleClose}
      footer={[]}
    >
      <FloatInput
        containerClassName="mt-6"
        type="text"
        label={SettingsEnum[type]}
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <div className="flex gap-4 mt-6">
        <MainBtn
          variant="outline"
          text="Ləğv et"
          className="w-full"
          onClick={() => setIsOpenModal(false)}
        />
        <MainBtn
          className="w-full"
          text="Yarat"
          disabled={!name}
          onClick={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </Modal>
  );
};
