import { ArrowDownUp } from 'lucide-react';

export const columns = [
  {
    title: () => (
      <div className="flex items-center gap-1">
        Ad, Soyad və ata adı
        <ArrowDownUp size={16} />
      </div>
    ),
    dataIndex: 'fullName',
    sorter: true,
    sortField: 'full_name',
  },
  {
    title: () => (
      <div className="flex items-center gap-1">
        İstifadəçi adı
        <ArrowDownUp size={16} />
      </div>
    ),
    dataIndex: 'userName',
    sorter: true,
    sortField: 'username',
  },
  {
    title: () => (
      <div className="flex items-center gap-1">
        İstifadəçi maili
        <ArrowDownUp size={16} />
      </div>
    ),
    dataIndex: 'email',
    sorter: true,
    sortField: 'email',
  },
  {
    title: () => (
      <div className="flex items-center gap-1">
        Mobil nömrə
        <ArrowDownUp size={16} />
      </div>
    ),
    dataIndex: 'mobile_number',
    sorter: true,
    sortField: 'mobile_number',
  },
  {
    title: () => (
      <div className="flex items-center gap-1">
        Vəzifə
        <ArrowDownUp size={16} />
      </div>
    ),
    dataIndex: 'position',
    sorter: true,
    sortField: 'position',
  },
  {
    title: () => (
      <div className="flex items-center gap-1">
        Statusu
        <ArrowDownUp size={16} />
      </div>
    ),
    dataIndex: 'status',
    // sorter: true,
    sortField: 'is_active',
    render: (status: boolean) =>
      status ? (
        <span className="px-4 py-[6px] rounded-full bg-green-100 text-green-700 font-medium">
          Aktiv
        </span>
      ) : (
        <span className="px-4 py-[6px] rounded-full bg-red-100 text-red-600 font-medium">
          Deaktiv
        </span>
      ),
  },
];
