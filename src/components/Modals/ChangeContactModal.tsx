import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import FloatInput from '../FloatInput';
import { MainBtn } from '../MainBtn';
import { EMAIL_VALIDATION_ERROR } from '@/lib/errors';
import { validateEmail } from '@/lib/helpers';

export const ChangeContactModal = ({
  isOpenModal,
  setIsOpenModal,
  phone,
  email,
  setUserData,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  phone: string;
  email: string;
  setUserData: (userData: any) => void;
}) => {
  const [values, setValues] = useState({
    phone,
    email,
  });

  console.log('VALUEs', values);

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: 'phone' | 'email',
  ) => {
    const { value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValues({
      phone,
      email,
    });
  }, [phone, email]);

  const handleCloseModal = () => {
    setValues({
      phone,
      email,
    });
    setError('');
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    if (!validateEmail(values.email)) {
      setError(EMAIL_VALIDATION_ERROR);
      return;
    }

    setUserData((prev: any) => ({
      ...prev,
      mobile_number: values.phone,
      email: values.email,
    }));

    setIsOpenModal(false);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Əlaqə məlumatları"
      onCancel={handleCloseModal}
      footer={[]}
    >
      <FloatInput
        type="text"
        label="Telefon nömrəsi"
        value={values.phone}
        onChange={(e) => handleChange(e, 'phone')}
        isError={!!error}
        containerClassName="mb-5 mt-6"
      />

      <FloatInput
        type="text"
        label="Email"
        value={values.email}
        onChange={(e) => handleChange(e, 'email')}
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
        <MainBtn className="w-full" text="Yadda Saxla" onClick={handleSubmit} />
      </div>
    </Modal>
  );
};
