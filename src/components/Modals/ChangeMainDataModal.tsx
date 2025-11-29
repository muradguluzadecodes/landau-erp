import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { LanguageEnum } from '@/lib/enums';
import {
  Directories,
  DirectoryItem,
  DirectoryVariants,
  UpdateUser,
} from '@/lib/types';

export const ChangeMainDataModal = ({
  isOpenModal,
  setIsOpenModal,
  userData,
  setUserData,
  directories,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  userData: UpdateUser;
  setUserData: (data: UpdateUser) => void;
  directories: Directories;
}) => {
  const [values, setValues] = useState<UpdateUser>({
    ...userData,
  });

  const generateOptionsForSelect = (
    directoryData: Directories | DirectoryItem[],
    variant: DirectoryVariants,
  ) => {
    const options = Array.isArray(directoryData)
      ? directoryData
      : directoryData[variant];

    return options?.map((item: DirectoryItem) => {
      return {
        value: `${item.id}`,
        label: item.name,
      };
    });
  };

  //TODO: WILL ADD IT TO THE USE DIRECTORY OPTIONS

  useEffect(() => {
    setValues({
      ...userData,
    });
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof values,
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSelectChange = (
    val: string | number,
    key: keyof typeof values,
  ) => {
    const updatedValue = key === 'language' ? val : Number(val);

    setValues((prev) => ({
      ...prev,
      [key]: updatedValue,
    }));
  };

  const handleCloseModal = () => {
    setValues({ ...values });
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    // setValues({ ...values });
    setUserData({ ...values });
    setIsOpenModal(false);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Yeni istifadəçi əlavə et"
      onCancel={handleCloseModal}
      footer={[]}
    >
      <p className="text-light mb-6">
        Xanaları dolduraraq yeni istifadəçi əlavə edə bilərsiniz!
      </p>

      <div className="flex flex-col gap-4 max-h-[330px] overflow-y-scroll py-4">
        <FloatInput
          label="İstifadəçi adı"
          type="text"
          value={values.username || ''}
          onChange={(e) => handleChange(e, 'username')}
        />

        <FloatInput
          type="select"
          label="Vəzifə"
          value={values.position?.toString() || ''}
          defaultSelectValue={values.position?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) => handleSelectChange(parseInt(v), 'position')}
          options={generateOptionsForSelect(directories, 'positions')}
        />

        <FloatInput
          type="select"
          label="Təhsil müəssisəsi"
          value={values?.educational_institution?.toString() || ''}
          defaultSelectValue={values?.educational_institution?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'educational_institution')
          }
          options={generateOptionsForSelect(directories, 'institutions')}
        />

        <FloatInput
          type="select"
          label="Departament"
          value={values.department?.toString() || ''}
          defaultSelectValue={values.department?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) => handleSelectChange(parseInt(v), 'department')}
          options={generateOptionsForSelect(directories, 'departments')}
        />
        <FloatInput
          type="select"
          label="ERP icazələr"
          value={values?.custom_permission_id?.toString() || ''}
          defaultSelectValue={values.custom_permission_id?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'custom_permission_id')
          }
          options={generateOptionsForSelect(directories, 'custom_permissions')}
        />

        <FloatInput
          type="select"
          label="Dil"
          required
          value={values.language}
          defaultSelectValue={
            LanguageEnum[values.language as keyof typeof LanguageEnum]
          }
          onSelectChange={(v) => handleSelectChange(v, 'language')}
          options={[
            { value: 'az', label: 'Azərbaycan' },
            { value: 'en', label: 'English' },
            { value: 'ru', label: 'Русский' },
          ]}
        />
      </div>

      <div className="flex gap-4 mt-10">
        <MainBtn
          className="w-full"
          variant="outline"
          text="Ləğv et"
          onClick={handleCloseModal}
        />
        <MainBtn className="w-full" text="Yadda saxla" onClick={handleSubmit} />
      </div>
    </Modal>
  );
};
