'use client';

import { Pagination, Select, Table } from 'antd';
import { useRouter } from 'next/navigation';

import { columns } from './columns';
import { Filters } from './Filters';
import { Statuses } from './Statuses';
import { LoadingPage } from '@/components/LoadingPage';
import { UserItem, UserTableRow } from '@/lib/types';
import { useAllUsers } from '@/queries/user/useAllUsers';

export default function UsersTable() {
  const router = useRouter();

  const { data: users, isLoading } = useAllUsers();
  const tableData: UserTableRow[] = users?.results?.map((user: UserItem) => ({
    key: user.id,
    fullName: user.full_name,
    userName: user.username,
    email: user.email,
    phone: user.mobile_number,
    role: user.position?.name,
    status: user.is_active ? 'inactive' : 'active',
  }));

  if (isLoading) return <LoadingPage />;

  return (
    <div className="section">
      <Filters />
      <Statuses />

      <div className="p-4">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowClassName={() =>
            'rounded-xl my-2 shadow-sm border-0! mb-4! !overflow-hidden cursor-pointer'
          }
          bordered={false}
          className="rounded-xl custom-users-table"
          onRow={(record) => {
            return {
              onClick: () => router.push(`/users/${record.key}`),
            };
          }}
        />

        <div className="flex justify-between mt-6">
          <Pagination defaultCurrent={1} total={500} showSizeChanger={false} />
          <div className="flex gap-4 items-center text-[14px] text-light">
            <p>50 müraciətdən 10 ədəd göstər</p>
            <Select
              className="custom-pagination-select!"
              defaultValue="10"
              style={{ width: 80 }}
              options={[
                { value: '10', label: '10' },
                { value: '25', label: '25' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
                { value: '150', label: '150' },
              ]}
              onChange={(v) => console.log('size:', v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
