import clsx from 'clsx';

export const columns: any[] = [
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
            success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
          )}
        >
          {success ? 'Uğurlu' : 'Uğursuz'}
        </span>
      );
    },
  },
];
