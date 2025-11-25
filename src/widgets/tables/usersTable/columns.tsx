export const columns = [
  {
    title: <div className="flex items-center gap-1">Ad, Soyad və ata adı</div>,
    dataIndex: 'fullName',
    sorter: true,
  },
  {
    title: <div className="flex items-center gap-1">İstifadəçi adı</div>,
    dataIndex: 'userName',
    sorter: true,
  },
  {
    title: <div className="flex items-center gap-1">İstifadəçi maili</div>,
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: <div className="flex items-center gap-1">Mobil nömrə</div>,
    dataIndex: 'phone',
    sorter: true,
  },
  {
    title: <div className="flex items-center gap-1">Vəzifə</div>,
    dataIndex: 'role',
    sorter: true,
  },
  {
    title: <div className="flex items-center gap-1">Statusu</div>,
    dataIndex: 'status',
    sorter: true,
    render: (status: string) =>
      status === 'active' ? (
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
