import { useState } from 'react';

import { TagBtn } from '@/components/TagBtn';
import { useUserFilters } from '@/store/useUserFilters';

export const Statuses = () => {
  const { setFilter } = useUserFilters();
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const handleClick = (status: 'all' | 'active' | 'inactive') => {
    if (status === 'all') {
      setStatus('all');
      setFilter('is_active', undefined);
    }

    if (status === 'active') {
      setStatus('active');
      setFilter('is_active', true);
    }

    if (status === 'inactive') {
      setStatus('inactive');
      setFilter('is_active', false);
    }
  };

  return (
    <div className="flex gap-2">
      <TagBtn
        isActive={status === 'all'}
        text="Hamısı"
        onClick={() => handleClick('all')}
      />
      <TagBtn
        isActive={status === 'active'}
        text="Aktiv"
        onClick={() => handleClick('active')}
      />
      <TagBtn
        isActive={status === 'inactive'}
        text="Deaktiv"
        onClick={() => handleClick('inactive')}
      />
    </div>
  );
};
