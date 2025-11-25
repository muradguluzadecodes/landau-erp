'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { forgotPassword } from '@/api/auth/forgotPassword';
import { ArrowLeft } from '@/assets/icons/icons';
import FloatInput from '@/components/FloatInput';
import { MainBtn } from '@/components/MainBtn';
import { EMAIL_VALIDATION_ERROR } from '@/lib/errors';
import { validateEmail } from '@/lib/helpers';

export default function Page() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const {
    mutate,
    isPending,
    error: responseError,
  } = useMutation({
    mutationFn: (data: { email: string }) => forgotPassword(data),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError(EMAIL_VALIDATION_ERROR);
    }
    mutate({ email });
  };

  return (
    <div className="relative">
      <Link className="absolute left-0 top-6" href={'/auth/login'}>
        <ArrowLeft />
      </Link>
      <div className="mb-6">
        <h2 className="text-[28px] font-bold">Şifrəni unutdunuz?</h2>
        <p className="text-light">Siz şifrənizi buradan yeniləyə bilərsiniz</p>
      </div>
      <FloatInput
        onChange={handleChange}
        type="text"
        label="Email"
        value={email}
        placeholder="Email"
        isError={!!error || !!responseError}
        errorMessage={error || responseError?.message}
      />
      <MainBtn
        onClick={handleSubmit}
        isLoading={isPending}
        text="Göndər"
        className="mt-4 w-full"
      />
    </div>
  );
}
