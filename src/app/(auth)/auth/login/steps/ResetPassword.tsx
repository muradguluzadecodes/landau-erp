'use client';

import { useState } from 'react';

import FloatInput from '@/components/FloatInput';

export const ResetPassword = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'email' | 'password',
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  return (
    <>
      <h3 className="text-[28px]">Xoş gəldiniz!</h3>
      <p className="text-light">
        Məlumatlarınızı yazaraq daxil ola bilərsiniz.
      </p>

      <div className="mt-6 flex flex-col gap-4 items-center">
        <FloatInput
          label="Email"
          placeholder="Email"
          type="text"
          value={values.email}
          onChange={(e) => handleChangeValue(e, 'email')}
          containerClassName="w-[80%]"
        />

        <FloatInput
          label="Şifrə"
          placeholder="Şifrə"
          type="password"
          value={values.password}
          onChange={(e) => handleChangeValue(e, 'password')}
          containerClassName="w-[80%]"
        />

        <div className="w-[80%] flex justify-end">
          <button className="underline text-[14px]">Şifrəni unutmusuz?</button>
        </div>

        <button className="btn-primary w-[80%]">Daxil ol</button>
      </div>
    </>
  );
};
