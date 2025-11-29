'use client';

import clsx from 'clsx';
import { Pencil, Plus, X } from 'lucide-react';
import { useState } from 'react';

import { MainBtn } from '@/components/MainBtn';
import { AddSettingModal } from '@/components/Modals/AddSettingModal';
import { DirectoryEditModal } from '@/components/Modals/DirectoryEditModal';
import { TagBtn } from '@/components/TagBtn';
import { DirectoryEditRow, SettingItem, SettingsVariants } from '@/lib/types';
import { useSettings } from '@/queries/settings/useSettings';
import GenericTable from '@/widgets/tables/GenericTable';

export default function Page() {
  const [activeTab, setActiveTab] = useState<SettingsVariants>('positions');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [addSettingModal, setAddSettingModal] = useState(false);
  const [editRow, setEditRow] = useState<DirectoryEditRow>(null);

  const { data, isLoading } = useSettings(activeTab, page, pageSize);

  const getTitle = () => {
    return (
      (activeTab === 'positions' && 'Vəzifənin adı') ||
      (activeTab === 'departments' && 'Departament adı') ||
      'Təhsil müəssisəsinin adı'
    );
  };

  //TODO: Hələlik az dilini seçirik. Dil məsələsini dəqiqləşdirdikdən sonra dəyişiklikləri et

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
      title: getTitle(),
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
        type={activeTab}
        editRow={editRow}
        setEditRow={setEditRow}
      />
      <AddSettingModal
        type={activeTab}
        isOpenModal={addSettingModal}
        setIsOpenModal={setAddSettingModal}
      />
      <div className="section">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-semibold mb-6">Ayarlar</h2>
          <MainBtn
            text={<Plus color="white" size={22} />}
            className="w-12! h-12 px-0!"
            onClick={() => setAddSettingModal(true)}
            disabled={false}
          />
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 mb-4">
          <TagBtn
            onClick={() => {
              setActiveTab('positions');
              setPage(1);
            }}
            text="Vəzifə"
            isActive={activeTab === 'positions'}
          />
          <TagBtn
            onClick={() => {
              setActiveTab('departments');
              setPage(1);
            }}
            text="Departament"
            isActive={activeTab === 'departments'}
            className="w-40"
          />
          <TagBtn
            onClick={() => {
              setActiveTab('institutions');

              setPage(1);
            }}
            className="w-[180px]!"
            text="Təhsil müəssisəsi"
            isActive={activeTab === 'institutions'}
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
