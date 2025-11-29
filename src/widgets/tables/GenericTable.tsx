'use client';

import { Pagination, Select } from 'antd';
import Table from 'antd/es/table';

export default function GenericTable({
  isLoading,
  columns,
  dataTable,
  currentPage,
  pageSize,
  totalCount,
  setPage,
  setPageSize,
}: {
  isLoading: boolean;
  columns: any[];
  dataTable: any[];
  currentPage: number | undefined;
  pageSize: number | undefined;
  totalCount: number | undefined;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}) {
  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataTable}
        pagination={false}
        rowKey="key"
        className="custom-users-table"
      />

      {/* PAGINATION */}
      <div className="flex justify-between mt-6 items-center h-20">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCount || 0}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
          defaultCurrent={1}
          disabled={!totalCount}
        />

        <div className="flex gap-4 items-center h-[full] text-[14px] text-light">
          <p className="mt-4">
            {totalCount} məlumatdan {pageSize} ədəd göstər
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
    </>
  );
}
