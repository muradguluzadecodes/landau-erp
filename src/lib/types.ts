import { LanguageEnum } from './enums';

export interface CreateUserFormValues {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  father_name: string | null;
  username: string | null;
  mobile_number: string | null;
  educational_institution: string | number | null;
  position: string | null;
  department: string | number | null;
  language: string | number | null;
  custom_permission_id: string | number | null;
}

export type UpdateUser = CreateUserFormValues;

export interface CreateUserErrors {
  email: string;
  first_name: string;
  last_name: string;
  father_name: string;
  username: string;
  mobile_number: string;
  educational_institution: string;
  position: string;
  department: string;
  language: string;
  custom_permission_id: string;
}

export type UserTableRow = {
  key: string;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};

/*INSTITUTION */

export interface Institution {
  id: number;
  name: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  created_at: string;
  updated_at: string;
}

export type InstitutionList = Institution[];

/*USERS*/

export interface BaseEntity {
  id: number | null;
  name: string | null;
  name_az: string | null;
  name_en: string | null;
  name_ru: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DepartmentEntity extends BaseEntity {
  is_active: boolean | null;
}

export interface UserItem {
  id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  father_name: string | null;
  full_name: string | null;
  mobile_number: string | null;

  educational_institution: BaseEntity | null;
  position: BaseEntity | null;
  department: DepartmentEntity | null;

  language: string | null;
  is_staff: boolean | null;
  is_active: boolean | null;

  created_at: string | null;
  updated_at: string | null;

  custom_permission: string | null;
  last_login_time: string | null;
}

/*LANGUAGE */

export type LanguageKey = keyof typeof LanguageEnum;
