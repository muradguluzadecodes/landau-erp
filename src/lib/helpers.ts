import {
  CreateUserErrors,
  CreateUserFormValues,
  Directories,
  DirectoryItem,
  DirectoryVariants,
} from './types';

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateCreateUserData = (
  values: CreateUserFormValues,
  setErrors: (value: CreateUserErrors) => void,
) => {
  const newErrors: any = {};

  if (!values?.first_name?.trim()) newErrors.first_name = 'Ad tələb olunur';
  if (!values?.last_name?.trim()) newErrors.last_name = 'Soyad tələb olunur';
  if (!values?.father_name?.trim())
    newErrors.father_name = 'Ata adı tələb olunur';
  if (!values?.username?.trim())
    newErrors.username = 'İstifadəçi adı tələb olunur';

  if (!values?.email?.trim()) newErrors.email = 'Email tələb olunur';
  else if (!values?.email?.includes('@'))
    newErrors.email = 'Düzgün email daxil edin';

  if (!values?.mobile_number?.trim())
    newErrors.mobile_number = 'Mobil nömrə tələb olunur';

  if (!values.educational_institution)
    newErrors.educational_institution = 'Universitet tələb olunur';

  if (!values.position) newErrors.position = 'Vəzifə tələb olunur';

  if (!values.department) newErrors.department = 'Departament tələb olunur';

  if (!values.custom_permission_id)
    newErrors.custom_permission_id = 'ERP icazəsi tələb olunur';

  if (!values.language) newErrors.language = 'Dil seçilməlidir';

  setErrors(newErrors as CreateUserErrors);

  return Object.keys(newErrors as CreateUserErrors).length === 0;
};

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// THIS IS FOR EXCLUDING SETTER FUNCTIONS FROM FILTERS OBJECT TO SEND JUST NON-FUNCTION PROPERTIES AS PAYLOAD
export const getOnlyFilters = (state: Record<string, any>) => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(state).filter(([_, value]) => typeof value !== 'function'),
  );
};

//TODO: Gelecekde bax gor reusable etmek olsa, yeni item.name her bir selectde varsa refactor et
export const getDirectoryOptionsForSelect = (directory: DirectoryItem[]) => {
  return directory?.map((item: DirectoryItem) => {
    return {
      value: `${item.id}`,
      label: item.name,
    };
  });
};

export const getDirectorySelectValue = (
  value: number | string | DirectoryItem,
  directories: Directories,
  variant?: DirectoryVariants,
) => {
  if (typeof value === 'number') {
    const directory =
      (variant === 'positions' && directories?.positions) ||
      (variant === 'departments' && directories?.departments) ||
      (variant === 'custom_permissions' && directories?.custom_permissions) ||
      directories?.institutions;

    return (
      directory?.find((item: DirectoryItem) => item.id === value)?.name || ''
    );
  }

  if (typeof value === 'object' && value !== null) {
    return value.name || '';
  }

  return value;
};
