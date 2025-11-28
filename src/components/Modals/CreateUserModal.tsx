import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { createUser } from '@/api/user-management/createUser';
import { useDirectories } from '@/hooks/useDirectoryOptions';
import { getDirectoryOptionsForSelect } from '@/lib/helpers';
import { CreateUserErrors, CreateUserFormValues } from '@/lib/types';

const initialValues = {
  email: '',
  first_name: '',
  last_name: '',
  father_name: '',
  username: '',
  mobile_number: '',
  educational_institution: '',
  position: '',
  department: '',
  language: '',
  custom_permission_id: '',
};

const initialErrors = {
  email: '',
  first_name: '',
  last_name: '',
  father_name: '',
  username: '',
  mobile_number: '',
  educational_institution: '',
  position: '',
  department: '',
  language: '',
  custom_permission_id: '',
};

export const CreateUserModal = ({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}) => {
  const [values, setValues] = useState<CreateUserFormValues>({
    ...initialValues,
  });

  const [errors, setErrors] = useState<CreateUserErrors>({
    ...initialErrors,
  });

  const queryClient = useQueryClient();

  const { directories } = useDirectories();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof values,
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

    // clear error on change
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSelectChange = (
    val: string | number,
    key: keyof typeof values,
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));

    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleCloseModal = () => {
    setErrors({ ...initialErrors });
    setValues({ ...initialValues });
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    // if (!validateCreateUserData(values, setErrors)) return;

    //TODO: TEMPORARY
    const correctedValues: CreateUserFormValues = {
      ...values,
      language: 'az',
      custom_permission_id: null,
    };

    mutate(correctedValues);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all_users'],
      });

      setValues({ ...initialValues });
      setIsOpenModal(false);
    },
  });

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
          label="Ad"
          type="text"
          required
          value={values?.first_name || ''}
          onChange={(e) => handleChange(e, 'first_name')}
          errorMessage={errors.first_name}
          isError={!!errors.first_name}
        />

        <FloatInput
          label="Soyad"
          type="text"
          required
          value={values?.last_name || ''}
          onChange={(e) => handleChange(e, 'last_name')}
          errorMessage={errors.last_name}
          isError={!!errors.last_name}
        />

        <FloatInput
          label="Ata adı"
          type="text"
          required
          value={values?.father_name || ''}
          onChange={(e) => handleChange(e, 'father_name')}
          errorMessage={errors.father_name}
          isError={!!errors.father_name}
        />

        <FloatInput
          label="İstifadəçi adı"
          type="text"
          required
          value={values?.username || ''}
          onChange={(e) => handleChange(e, 'username')}
          errorMessage={errors.username}
          isError={!!errors.username}
        />

        <FloatInput
          label="Email ünvanı"
          type="text"
          required
          value={values?.email?.toString() || ''}
          onChange={(e) => handleChange(e, 'email')}
          errorMessage={errors.email}
          isError={!!errors.email}
        />

        <FloatInput
          label="Mobil nömrə"
          type="text"
          required
          value={values?.mobile_number?.toString() || ''}
          onChange={(e) => handleChange(e, 'mobile_number')}
          errorMessage={errors.mobile_number}
          isError={!!errors.mobile_number}
        />

        <FloatInput
          type="select"
          label="Təhsil müəssisəsi"
          required
          value={values?.educational_institution.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'educational_institution')
          }
          options={getDirectoryOptionsForSelect(directories.institutions)}
          errorMessage={errors.educational_institution}
          isError={!!errors.educational_institution}
        />

        <FloatInput
          label="Vəzifə"
          type="select"
          required
          value={values?.position.toString() || ''}
          onSelectChange={(v) => handleSelectChange(parseInt(v), 'position')}
          containerClassName="mb-4"
          options={getDirectoryOptionsForSelect(directories.positions)}
          errorMessage={errors.position}
          isError={!!errors.position}
        />

        <FloatInput
          type="select"
          label="Departament"
          value={values?.department.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) => handleSelectChange(parseInt(v), 'department')}
          options={getDirectoryOptionsForSelect(directories.departments)}
          errorMessage={errors.department}
          isError={!!errors.department}
        />

        <FloatInput
          type="select"
          label="ERP icazələr"
          required
          // value={values?.custom_permission_id?.toString() || ''}
          value={' consectetur adipiscing elit'}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'custom_permission_id')
          }
          // options={permissionsOptions}
          errorMessage={errors.custom_permission_id}
          isError={!!errors.custom_permission_id}
        />

        <FloatInput
          type="select"
          label="Dil"
          required
          value={values.language}
          onSelectChange={(v) => handleSelectChange(v, 'language')}
          options={[
            { value: 'az', label: 'Azərbaycan' },
            { value: 'en', label: 'English' },
            { value: 'ru', label: 'Русский' },
          ]}
          errorMessage={errors.language}
          isError={!!errors.language}
        />
      </div>

      <div className="flex gap-4 mt-10">
        <MainBtn
          className="w-full"
          variant="outline"
          text="Ləğv et"
          onClick={handleCloseModal}
        />
        <MainBtn
          className="w-full"
          text="İstifadəçi yarat"
          onClick={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </Modal>
  );
};
