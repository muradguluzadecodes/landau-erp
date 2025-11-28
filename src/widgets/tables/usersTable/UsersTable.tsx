'use client';

import { Pagination, Select, Table, TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { columns } from './columns';
import { Filters } from './Filters';
import { Statuses } from './Statuses';
import { getOnlyFilters } from '@/lib/helpers';
import { UserItem, UserTableRow } from '@/lib/types';
import { useAllUsers } from '@/queries/user/useAllUsers';
import { useUserFilters } from '@/store/useUserFilters';

export default function UsersTable() {
  const router = useRouter();
  const filters = useUserFilters((state) => state);
  const setFilter = useUserFilters((state) => state.setFilter);

  const params = useMemo(() => getOnlyFilters(filters), [filters]);

  const { data: users, isLoading } = useAllUsers(params);
  const tableData: UserTableRow[] | undefined = users?.results?.map(
    (user: UserItem) => ({
      key: user.id,
      fullName: `${user.first_name} ${user.last_name} ${user.father_name}`,
      userName: user.username,
      email: user.email,
      mobile_number: user.mobile_number,
      position: user.position?.name,
      status: user.is_active ? 'inactive' : 'active',
    }),
  );

  /*SORTING */
  const handleSortTable: TableProps<UserTableRow>['onChange'] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    const order = s?.order; // 'ascend' | 'descend' | null | undefined
    const rawField = s?.field; // Key | undefined

    if (order && typeof rawField === 'string') {
      const direction = order === 'ascend' ? '' : '-';
      setFilter('ordering', `${direction}${rawField}`);
    } else {
      setFilter('ordering', undefined);
    }

    setFilter('page', 1);
  };

  return (
    <div className="section">
      <Filters />
      <Statuses />

      <div className="p-4 mt-4">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowClassName={() =>
            'my-2 border-0! mb-4! !overflow-hidden cursor-pointer'
          }
          bordered={false}
          onChange={handleSortTable}
          className="rounded-xl custom-users-table"
          onRow={(record) => {
            return {
              onClick: () => router.push(`/users/${record.key}`),
            };
          }}
        />

        <div className="flex justify-between mt-6">
          <Pagination
            defaultCurrent={1}
            total={users?.count}
            showSizeChanger={false}
            disabled={!users?.count}
          />
          <div className="flex gap-4 items-center text-[14px] h-full text-light">
            <p className="mt-4">
              {users?.count} istifadəçidən {filters?.page_size} ədəd göstər
            </p>
            <Select
              className="custom-pagination-select!"
              defaultValue="10"
              style={{ width: 80 }}
              disabled={!users?.count}
              options={[
                { value: '10', label: '10' },
                { value: '25', label: '25' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
                { value: '150', label: '150' },
              ]}
              onChange={(v) => setFilter('page_size', v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
