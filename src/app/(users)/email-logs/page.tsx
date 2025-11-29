'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RotateCw } from 'lucide-react';
import { useState } from 'react';

import { emailRetry } from '@/api/email-management/emailRetry';
import { TagBtn } from '@/components/TagBtn';
import { formatDate } from '@/lib/helpers';
import { EmailLog } from '@/lib/types';
import { useEmailLogs } from '@/queries/email/useEmailLogs';
import { columns as baseColumns } from '@/widgets/tables/emailLogs/columns';
import GenericTable from '@/widgets/tables/GenericTable';

export default function Page() {
  const [display, setDisplay] = useState<'all' | 'failed'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const queryClient = useQueryClient();

  const isAll = display === 'all';

  const columns = [
    ...baseColumns,
    ...(!isAll
      ? [
          {
            title: 'Yenidən göndər',
            key: 'resend',
            width: 150,
            render: (_: any, record: EmailLog) => (
              <button
                className="w-full"
                onClick={() => mutate(String(record.key))}
                disabled={isPending}
              >
                <div className="flex-center w-full">
                  <RotateCw size={18} />
                </div>
              </button>
            ),
          },
        ]
      : []),
  ];

  const { data, isLoading } = useEmailLogs(page, pageSize, isAll);

  const { mutate, isPending } = useMutation({
    mutationFn: emailRetry,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['email-logs'],
      });
    },
  });

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

      <GenericTable
        isLoading={isLoading || isPending}
        columns={columns}
        dataTable={tableData}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        totalCount={data?.count}
      />
    </div>
  );
}
