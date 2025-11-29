'use client';

import clsx from 'clsx';
import { Pencil, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MainBtn } from '@/components/MainBtn';
import { DirectoryEditModal } from '@/components/Modals/DirectoryEditModal';
import { DirectoryEditRow, SettingItem } from '@/lib/types';
import { useAllCustomPermissions } from '@/queries/permissions/useAllCustomPermissions';
import GenericTable from '@/widgets/tables/GenericTable';

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editRow, setEditRow] = useState<DirectoryEditRow>(null);

  const router = useRouter();

  //TODO: Hələlik az dilini seçirik. Dil məsələsini dəqiqləşdirdikdən sonra dəyişiklikləri et

  const { data, isLoading } = useAllCustomPermissions();

  const tableData: {
    name: string;
    key: string;
  }[] = data?.results?.map((item: SettingItem) => ({
    name: item.name_az,
    key: item.id,
  }));

  // TODO: FIND A WAY TO MOVE TO THE COLUMNS END IMPORT FROM THERE
  const columns: any[] = [
    {
      title: 'ERP icazənin adı',
      dataIndex: 'name',
    },

    {
      title: 'Statusu',
      dataIndex: 'actions',
      width: 140,
      render: (_: any, record: any) => {
        const item = data?.results?.filter(
          (item: SettingItem) => item.id === record.key,
        )[0];

        const rowData = {
          id: record.key,
          names: {
            name: item.name,
            name_az: item.name_az,
            name_ru: item.name_ru,
            name_en: item.name_en,
          },
        };

        return (
          <span className={clsx('shadow-none! flex gap-4')}>
            <button
              onClick={() => setEditRow({ ...rowData, action: 'update' })}
            >
              <Pencil className="text-success " size={20} />
            </button>
            <button>
              <X
                onClick={() => setEditRow({ ...rowData, action: 'delete' })}
                className="text-error"
                size={24}
              />
            </button>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <DirectoryEditModal
        editRow={editRow}
        setEditRow={setEditRow}
        type="custom_permissions"
      />
      <div className="section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-semibold mb-6">ERP İcazələr</h2>
          <MainBtn
            text={<Plus color="white" size={22} />}
            className="w-12! h-12 px-0!"
            disabled={false}
            onClick={() => router.push('/erp-permissions/create')}
          />
        </div>

        <GenericTable
          isLoading={isLoading}
          columns={columns}
          dataTable={tableData}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={data?.count}
        />
      </div>
    </>
  );
}
