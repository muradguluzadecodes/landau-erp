'use client';

import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Building2, ChevronLeft, FileText, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import LogoFull from '../assets/images/logos/logo-full.png';
import Logo from '../assets/images/logos/logo.png';

const menuItems = [
  {
    key: 'users',
    icon: <Users size={18} />,
    label: <span>İstifadəçilər</span>,
    children: [
      {
        key: 'users-list',
        label: <Link href="/users">İstifadəçilər</Link>,
      },
      {
        key: 'email-logs',
        label: <Link href="/email-logs">E-mail logları</Link>,
      },
      {
        key: 'settings',
        label: <Link href="/settings">Ayarlar</Link>,
      },
      {
        key: 'erp-permissions',
        label: <Link href="/erp-permissions">ERP icazələr</Link>,
      },
    ],
  },

  {
    key: 'forms',
    icon: <FileText size={18} />,
    label: <Link href="application-form">Müraciət form</Link>,
  },

  {
    key: 'landau',
    icon: <Building2 size={18} />,
    label: 'Landau',
    children: [
      {
        key: 'landau-1',
        label: <Link href="/landau/applications">Applications</Link>,
      },
      {
        key: 'landau-2',
        label: <Link href="/landau/history">History</Link>,
      },
    ],
  },
];
export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.includes('auth');

  if (isAuthPage) return;

  return (
    <div className="relative border border-border bg-section-bg w-fit rounded-[20px] py-16 px-2">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex-center cursor-pointer bg-primary-light p-3 rounded-full absolute -right-4.5 top-4  z-2"
      >
        <ChevronLeft
          size={20}
          style={{
            color: 'var(--color-primary)',
          }}
          className={`transition-transform duration-300 ${
            collapsed ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <div className="w-full flex-center mb-4">
        {collapsed ? (
          <Image
            width={400}
            height={200}
            src={Logo.src}
            className="w-16 h-auto"
            alt="logo"
          />
        ) : (
          <Image
            width={600}
            height={200}
            src={LogoFull.src}
            className="w-40 h-auto"
            alt="logo"
          />
        )}
      </div>

      <Sider
        width={260}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        style={{
          background: 'transparent',
          height: '100vh',
        }}
      >
        <Menu
          mode="inline"
          items={menuItems}
          defaultOpenKeys={['users']}
          defaultSelectedKeys={['users-list']}
          style={{ border: 'none', background: 'transparent' }}
        />
      </Sider>
    </div>
  );
};
