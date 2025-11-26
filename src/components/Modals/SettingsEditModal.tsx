'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { updateAndDeleteSettings } from '@/api/settings/updateSettings';
import { SettingsEnum } from '@/lib/enums';
import {
  SettingRowActions,
  SettingsEditRow,
  SettingsVariants,
} from '@/lib/types';

export const SettingsEditModal = ({
  setEditRow,
  type,
  editRow,
}: {
  editRow: SettingsEditRow;
  setEditRow: (value: SettingsEditRow | null) => void;
  type: SettingsVariants;
}) => {
  const [tempValue, setTempValue] = useState(editRow?.names?.name || '');
  const queryClient = useQueryClient();
  const action = editRow?.action;

  useEffect(() => {
    if (editRow?.names) {
      setTempValue(editRow?.names.name || '');
    }
  }, [editRow]);

  const labels = {
    update: {
      positions: 'Vəzifədə düzəliş et',
      departments: 'Departamentdə düzəliş et',
      institutions: 'Təhsil müəssisəsində düzəliş et',
    },
    delete: {
      positions: 'Vəzifəni sil',
      departments: 'Departamenti sil',
      institutions: 'Təhsil müəssisəsini sil',
    },
  } as const;

  const questions = {
    positions: `"${editRow?.names?.name}" vəzidəsini silmək istədiyinizdən əminsiniz?`,
    departments: `"${editRow?.names?.name}" departamentini silmək istədiyinizdən əminsiniz?`,
    institutions: `"${editRow?.names?.name}" adlı təhsil müəssisəsini silmək istədiyinizdən əminsiniz?`,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateAndDeleteSettings,
    onSuccess: () => {
      setEditRow(null);
      queryClient.invalidateQueries({
        queryKey: ['settings', type],
      });
    },
  });

  if (!editRow) return null;

  const modalTitle = labels[action as SettingRowActions][type];
  const label = SettingsEnum[type];

  const handleCancel = () => {
    setEditRow(null);
    setTempValue(editRow?.names?.name || '');
  };

  const handleSubmit = () => {
    const names = { ...editRow?.names };

    const data = {
      name_az: tempValue,
      name_ru: names.name_ru,
      name_en: names.name_en,
    };

    const id = editRow?.id as string;
    if (action) mutate({ type, data, id, action });
  };

  const buttonText = action === 'delete' ? 'Sil' : 'Yadda saxla';
  return (
    <Modal
      open={!!editRow}
      title={modalTitle}
      onCancel={handleCancel}
      footer={[]}
    >
      {action === 'update' && (
        <FloatInput
          containerClassName="mt-6"
          type="text"
          value={tempValue || ''}
          label={label}
          onChange={(v) => setTempValue(v.target.value)}
        />
      )}

      {action === 'delete' && <p className="text-light">{questions[type]}</p>}

      <div className="flex gap-4 mt-6">
        <MainBtn
          variant="outline"
          text="Ləğv et"
          className="w-full"
          onClick={() => setEditRow(null)}
        />
        <MainBtn
          className="w-full"
          text={buttonText}
          disabled={
            action === 'update' ? tempValue === editRow?.names?.name : false
          }
          onClick={handleSubmit}
          isLoading={isPending}
          //   isLoading={isPending}
        />
      </div>
    </Modal>
  );
};
