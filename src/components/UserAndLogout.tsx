'use client';

import { LogOut } from 'lucide-react';

import { useUser } from '@/queries/user/useUser';

export const UserAndLogout = () => {
  const { data, isLoading } = useUser();

  const userName = isLoading ? 'Yüklənir...' : data?.full_name;

  return (
    <div className="section flex justify-between items-center mb-6">
      <p className="font-bold">{userName}</p>

      <button>
        <LogOut />
      </button>
    </div>
  );
};
