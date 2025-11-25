import { useMutation } from '@tanstack/react-query';
import { Modal } from 'antd';
import { ParamValue } from 'next/dist/server/request/params';
import { useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { changePassword } from '@/api/user-management/changePassword';

export const ChangePasswordModal = ({
  isOpenModal,
  setIsOpenModal,
  userId,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  userId: string | ParamValue;
}) => {
  const initialPasswords = {
    password: '',
    confirm_password: '',
  };

  const [passwords, setPasswords] = useState({
    ...initialPasswords,
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: 'password' | 'confirm_password',
  ) => {
    const { value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
  });

  const handleCloseModal = () => {
    setPasswords(initialPasswords);
    setError('');
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    if (passwords.password !== passwords.confirm_password) {
      setError('Şifrələr eyni deyil');
      return;
    }

    setError('');

    mutate({
      id: userId as string,
      data: passwords,
      func: () => {
        setIsOpenModal(false);
      },
    });
  };

  return (
    <Modal
      open={isOpenModal}
      title="Şifrəni yenilə"
      onCancel={handleCloseModal}
      footer={[]}
    >
      <FloatInput
        type="password"
        label="Şifrə"
        value={passwords.password}
        onChange={(e) => handleChange(e, 'password')}
        isError={!!error}
        containerClassName="mb-5 mt-6"
      />

      <FloatInput
        type="password"
        label="Şifrənin təstiqi"
        value={passwords.confirm_password}
        onChange={(e) => handleChange(e, 'confirm_password')}
        isError={!!error}
        errorMessage={error}
      />

      <div className="flex gap-4 mt-10">
        <MainBtn
          variant="outline"
          text="Ləğv et"
          className="w-full"
          onClick={() => setIsOpenModal(false)}
        />
        <MainBtn
          className="w-full"
          text="Yenilə"
          onClick={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </Modal>
  );
};
