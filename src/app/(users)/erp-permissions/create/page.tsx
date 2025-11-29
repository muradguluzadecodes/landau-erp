'use client';

import { Collapse, Switch } from 'antd';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ArrowLeft } from '@/assets/icons/icons';
import FloatInput from '@/components/FloatInput';

export type MenuItem = {
  title: string;
  key: string;
  items?: MenuItem[];
};

const { Panel } = Collapse;

// -----------------------------------------------------
// 🔥 Multi-level recursive accordion
// -----------------------------------------------------
function MultiLevelAccordion({
  items,
  level = 0,
}: {
  items: MenuItem[];
  level?: number;
}) {
  return (
    <Collapse ghost className="w-full">
      {items.map((item) => {
        const hasChildren = item.items && item.items.length > 0;

        return (
          <Panel
            key={item.key}
            showArrow={false}
            style={{ marginBottom: 4, width: '100% !important' }}
            collapsible={hasChildren ? 'header' : 'icon'}
            header={
              <div
                style={{
                  marginLeft: level * 30,
                  display: 'flex !important',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '16px 40px 16px 20px',
                  backgroundColor: '#f7f7f7',
                  borderRadius: 12,
                }}
              >
                <div className="flex justify-between items-center gap-2 w-full!">
                  <div className="flex items-center gap-2">
                    {hasChildren && <ChevronRight size={16} />}
                    <p className={clsx(level === 0 && 'font-semibold')}>
                      {item.title}
                    </p>
                  </div>
                </div>
                <Switch size={'small'} />
              </div>
            }
          >
            {item.items && item.items.length > 0 && (
              <MultiLevelAccordion items={item.items} level={level + 1} />
            )}
          </Panel>
        );
      })}
    </Collapse>
  );
}

// -----------------------------------------------------
// PAGE
// -----------------------------------------------------

const menuData: MenuItem[] = [
  { title: 'Landau', key: 'landau_1', items: [] },
  {
    title: 'İstifadəçilər',
    key: 'users',
    items: [
      { title: 'İstifadəçilər', key: 'users_1' },
      { title: 'E-mail loqları', key: 'email_logs' },
      { title: 'Ayarlar', key: 'settings' },
      { title: 'ERP icazələr', key: 'permissions' },
    ],
  },
  {
    title: 'Landau',
    key: 'landau_2',
    items: [{ title: 'Landau', key: 'landau_sub_1' }],
  },
];

export default function Page() {
  const [name, setName] = useState('');

  return (
    <div className="section pt-8">
      <Link href="/erp-permissions">
        <ArrowLeft />
      </Link>

      <h2 className="text-[24px] font-semibold my-6">Yeni ERP İcazəsi yarat</h2>

      <FloatInput
        label="İcazənin adı"
        value={name}
        type="text"
        required
        containerClassName="w-60! mb-6"
        onChange={(e) => setName(e.target.value)}
      />

      {/* MAIN ACCORDION */}
      <MultiLevelAccordion items={menuData} />
    </div>
  );
}
