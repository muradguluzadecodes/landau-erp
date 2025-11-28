'use client';

import { Switch } from 'antd';
import { useEffect, useState } from 'react';

import { ApplicationForm } from '@/lib/types';

function TableDataFooter({ is_enabled }: ApplicationForm) {
  const [isActive, setIsActive] = useState<boolean>(Boolean(is_enabled));

  useEffect(() => {
    setIsActive(Boolean(is_enabled));
  }, [is_enabled]);

  const handleToggle = (checked: boolean) => {
    setIsActive(checked);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <h3 className="text-[12px] font-semibold text-[#141414]">Aktiv</h3>
      <Switch onChange={handleToggle} checked={isActive} />
    </div>
  );
}

export default TableDataFooter;
