import { useMutation } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { createUser } from '@/api/user-management/createUser';
import { Institution as InstitutionType } from '@/lib/types';
import { CreateUserErrors, CreateUserFormValues } from '@/lib/types';
import { useAllDepartments } from '@/queries/departments/useAllDepartments';
import { useAllInstituons } from '@/queries/institutions/useAllInstituons';
import { useAllPermissions } from '@/queries/permissions/useAllPermissions';

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

  const { data: institutions } = useAllInstituons();
  const { data: permissions } = useAllPermissions();
  const { data: departments } = useAllDepartments();
  const institutionsOptions = institutions?.results.map(
    (item: InstitutionType) => {
      return {
        value: `${item.id}`,
        label: item.name,
      };
    },
  );
  const permissionsOptions = permissions?.results?.map(
    (item: InstitutionType) => {
      return {
        value: `${item.id}`,
        label: item.name,
      };
    },
  );

  const departmentsOptions = departments?.result?.map(
    (item: InstitutionType) => {
      return {
        value: `${item.id}`,
        label: item.name,
      };
    },
  );

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

    // TEMPORARY
    const correctedValues: CreateUserFormValues = {
      ...values,
      department: null,
      educational_institution: null,
      language: 'az',
      custom_permission_id: null,
      position: null,
    };

    mutate(correctedValues);
    setValues({ ...initialValues });
    setIsOpenModal(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
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
          value={values?.email || ''}
          onChange={(e) => handleChange(e, 'email')}
          errorMessage={errors.email}
          isError={!!errors.email}
        />

        <FloatInput
          label="Mobil nömrə"
          type="text"
          required
          value={values?.mobile_number || ''}
          onChange={(e) => handleChange(e, 'mobile_number')}
          errorMessage={errors.mobile_number}
          isError={!!errors.mobile_number}
        />

        <FloatInput
          type="select"
          label="Təhsil müəssisəsi"
          required
          value={values?.educational_institution?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'educational_institution')
          }
          options={institutionsOptions}
          errorMessage={errors.educational_institution}
          isError={!!errors.educational_institution}
        />

        <FloatInput
          label="Vəzifə"
          type="text"
          required
          value={values?.position?.toString() || ''}
          onChange={(e) => handleChange(e, 'position')}
          errorMessage={errors.position}
          isError={!!errors.position}
        />

        <FloatInput
          type="select"
          label="Departament"
          value={values?.department?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) => handleSelectChange(parseInt(v), 'department')}
          options={departmentsOptions}
        />

        <FloatInput
          type="select"
          label="ERP icazələr"
          required
          value={values?.custom_permission_id?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'custom_permission_id')
          }
          options={permissionsOptions}
          errorMessage={errors.custom_permission_id}
          isError={!!errors.custom_permission_id}
        />

        <FloatInput
          type="select"
          label="Dil"
          required
          value={values.language as string}
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
