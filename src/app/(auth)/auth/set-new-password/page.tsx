'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { setPassword, SetPasswordData } from '@/api/auth/setPassword';
import FloatInput from '@/components/FloatInput';
import { MainBtn } from '@/components/MainBtn';
import { PASSWORD_RESET_VALIDATION_ERROR } from '@/lib/errors';

export default function Page() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [passwords, setPasswords] = useState({
    password: '',
    validatePassword: '',
  });

  const router = useRouter();

  const [error, setError] = useState('');

  const {
    mutate,
    isPending,
    error: responseError,
  } = useMutation({
    mutationFn: (data: SetPasswordData) =>
      setPassword(data, () => router.push('/auth/login')),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'password' | 'validatePassword',
  ) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (passwords.password !== passwords.validatePassword) {
      setError(PASSWORD_RESET_VALIDATION_ERROR);
      return;
    }

    if (!uid || !token) {
      setError('Link etibarsızdır.');
      return;
    }

    mutate({
      uid,
      token,
      password: passwords.password,
      confirm_password: passwords.validatePassword,
    });
  };

  return (
    <div className="relative">
      <div className="mb-6">
        <h2 className="text-[28px] font-bold">Şifrəni təyin et!</h2>
        <p className="text-light">Siz şifrənizi buradan təyin edə bilərsiniz</p>
      </div>

      <div className="flex flex-col gap-6">
        <FloatInput
          onChange={(e) => handleChange(e, 'password')}
          type="password"
          label="Yeni şifrəniz"
          value={passwords.password}
          placeholder="Yeni şifrəniz"
          isError={!!error || !!responseError}
        />

        <FloatInput
          onChange={(e) => handleChange(e, 'validatePassword')}
          type="password"
          label="Şifrənin təstiqi"
          value={passwords.validatePassword}
          placeholder="Şifrənin təstiqi"
          isError={!!error || !!responseError}
          errorMessage={error || responseError?.message}
        />

        <MainBtn
          onClick={handleSubmit}
          disabled={!passwords.password || !passwords.validatePassword}
          isLoading={isPending}
          text="Yadda saxla"
          className="mt-4 w-full"
        />
      </div>
    </div>
  );
}
