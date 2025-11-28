'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pagination, Select } from 'antd';
import Table from 'antd/es/table';
import clsx from 'clsx';
import { RotateCw } from 'lucide-react';
import { useState } from 'react';

import { emailRetry } from '@/api/email-management/emailRetry';
import { TagBtn } from '@/components/TagBtn';
import { formatDate } from '@/lib/helpers';
import { EmailLog } from '@/lib/types';
import { useEmailLogs } from '@/queries/email/useEmailLogs';

export default function Page() {
  const [display, setDisplay] = useState<'all' | 'failed'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const queryClient = useQueryClient();

  const isAll = display === 'all';

  // Fetch logs
  const { data, isLoading } = useEmailLogs(page, pageSize, isAll);

  // TABLE COLUMNS
  const columns: any[] = [
    {
      title: 'Sıra sayı',
      dataIndex: 'order',
      width: 100,
      render: (v: any) => <span className="font-medium">{v}</span>,
    },
    {
      title: 'İstifadəçi adı',
      dataIndex: 'username',
      width: 300,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },
    {
      title: 'Əlavə olunma tarixi',
      dataIndex: 'date',
    },
    {
      title: 'Statusu',
      dataIndex: 'status',
      width: 140,
      render: (_: any, record: any) => {
        const success = record.status === true;

        return (
          <span
            className={clsx(
              'px-4 py-1 rounded-full  text-sm ',
              success
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600',
            )}
          >
            {success ? 'Uğurlu' : 'Uğursuz'}
          </span>
        );
      },
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: emailRetry,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['email-logs'],
      });
    },
  });

  // CONDITIONAL COLUMN when viewing failed emails
  if (!isAll) {
    columns.push({
      title: 'Yenidən göndər',
      key: 'resend',
      width: 150,
      render: (_: any, record: EmailLog) => (
        <button
          className="w-full"
          onClick={() => mutate(`${record.key}`)}
          disabled={isPending}
        >
          <div className="flex-center w-full">
            <RotateCw size={18} />
          </div>
        </button>
      ),
    });
  }

  // TABLE DATA
  const tableData: EmailLog[] =
    data?.results?.map((log: EmailLog, i: number) => ({
      order: (page - 1) * pageSize + i + 1,
      key: log.id,
      username: log.username,
      email: log.to_email,
      date: formatDate(log.created_at as string),
      status: log.is_succeeded === true, // FIXED HERE ✔
    })) || [];

  return (
    <div className="section  ">
      <h2 className="text-[24px] font-semibold mb-10">E-mail loqları</h2>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-10">
        <TagBtn
          onClick={() => {
            setDisplay('all');
            setPage(1);
          }}
          text="Hamısı"
          isActive={isAll}
        />
        <TagBtn
          onClick={() => {
            setDisplay('failed');
            setPage(1);
          }}
          text="Uğursuz"
          isActive={!isAll}
        />
      </div>

      {/* TABLE */}
      <Table
        loading={isLoading || isPending}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey="key"
        className="custom-users-table"
      />

      {/* PAGINATION */}
      <div className="flex justify-between mt-6 items-center h-20">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.count || 0}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
          defaultCurrent={1}
          disabled={!data?.count}
        />

        <div className="flex gap-4 items-center h-[full] text-[14px] text-light">
          <p className="mt-4">
            {data?.count} loqdan {pageSize} ədəd göstər
          </p>
          <Select
            value={pageSize}
            onChange={(v) => {
              setPageSize(v);
              setPage(1);
            }}
            style={{ width: 100 }}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 20, label: '20' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
