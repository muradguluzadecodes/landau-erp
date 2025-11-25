'use client';

import { useState } from 'react';

import FloatInput from '@/components/FloatInput';

export default function Page() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="">
        <h2 className="text-[28px] font-bold">Şifrəni unutdunuz?</h2>
        <p className="text-light">Siz şifrənizi buradan yeniləyə bilərsiniz</p>
      </div>
      <FloatInput
        onChange={handleChange}
        type="text"
        label="Email"
        value={value}
        placeholder="Email"
      />
    </div>
  );
}
