'use client';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { useUser } from '@/queries/user/useUser';

export const UserAndLogout = () => {
  const router = useRouter();
  const pathame = usePathname();
  const isAuthPage = pathame.includes('auth');

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/auth/login');
  };
  const { data, isLoading } = useUser();

  if (isAuthPage) return null;

  const userName = isLoading ? 'Yüklənir...' : data?.full_name;

  return (
    <div className="section flex justify-between items-center mb-6">
      <p className="font-bold">{userName}</p>

      <button onClick={handleLogout}>
        <LogOut />
      </button>
    </div>
  );
};
