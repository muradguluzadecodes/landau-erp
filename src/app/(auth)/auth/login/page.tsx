'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { login } from '@/api/auth/login';
import FloatInput from '@/components/FloatInput';
import { MainBtn } from '@/components/MainBtn';
import { EMAIL_VALIDATION_ERROR } from '@/lib/errors';
import { validateEmail } from '@/lib/helpers';

export default function Page() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'email' | 'password',
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    error: responseError,
  } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data, () => {
        router.replace('/users');
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
      }),
  });

  const handleSubmit = () => {
    if (isPending) return;

    if (!validateEmail(values.email)) {
      setErrors((prev) => ({
        ...prev,
        email: EMAIL_VALIDATION_ERROR,
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        email: '',
      }));
    }

    mutate(values);
  };

  return (
    <>
      <h3 className="text-[28px]">Xoş gəldiniz!</h3>
      <p className="text-light">
        Məlumatlarınızı yazaraq daxil ola bilərsiniz.
      </p>

      <div className="mt-6 flex flex-col gap-4 items-center">
        <FloatInput
          errorMessage={errors.email}
          isError={!!responseError}
          label="Email"
          placeholder="Email"
          type="text"
          value={values.email}
          onChange={(e) => handleChangeValue(e, 'email')}
          disabled={isPending}
        />

        <FloatInput
          label="Şifrə"
          placeholder="Şifrə"
          errorMessage={errors.password || responseError?.message}
          isError={!!responseError}
          type="password"
          value={values.password}
          onChange={(e) => handleChangeValue(e, 'password')}
          disabled={isPending}
        />

        <div className="w-full flex justify-end">
          <Link
            href={'/auth/forgot-password'}
            className="underline text-[14px]"
          >
            Şifrəni unutmusuz?
          </Link>
        </div>

        <MainBtn
          isLoading={isPending}
          onClick={handleSubmit}
          text="Daxil ol"
          className="w-full"
        />
      </div>
    </>
  );
}
