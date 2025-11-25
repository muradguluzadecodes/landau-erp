import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { Institution as InstitutionType, UpdateUser } from '@/lib/types';
import { useAllDepartments } from '@/queries/departments/useAllDepartments';
import { useAllInstituons } from '@/queries/institutions/useAllInstituons';
import { useAllPermissions } from '@/queries/permissions/useAllPermissions';

export const ChangeMainDataModal = ({
  isOpenModal,
  setIsOpenModal,
  userData,
  setUserData,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  userData: UpdateUser;
  setUserData: (data: UpdateUser) => void;
}) => {
  const [values, setValues] = useState<UpdateUser>({
    ...userData,
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
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleCloseModal = () => {
    setValues({ ...values });
    setIsOpenModal(false);
  };

  console.log('VALUESSSSS', values);

  const handleSubmit = () => {
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
          label="Vəzifə"
          type="text"
          value={values?.position?.toString() || ''}
          onChange={(e) => handleChange(e, 'position')}
        />

        <FloatInput
          type="select"
          label="Təhsil müəssisəsi"
          value={values?.educational_institution?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'educational_institution')
          }
          options={institutionsOptions}
        />

        <FloatInput
          type="select"
          label="Departament"
          value={values?.custom_permission_id?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) => handleSelectChange(parseInt(v), 'department')}
          options={departmentsOptions}
        />
        <FloatInput
          type="select"
          label="ERP icazələr"
          value={values?.custom_permission_id?.toString() || ''}
          containerClassName="mb-4"
          onSelectChange={(v) =>
            handleSelectChange(parseInt(v), 'custom_permission_id')
          }
          options={permissionsOptions}
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
