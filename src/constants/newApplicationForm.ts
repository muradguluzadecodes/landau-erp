import { type BaseItem, type TextAreaItem } from '@/lib/types';

export const NEW_APPLICATION_FORM_TECHNICAL_INFO: BaseItem[] = [
  {
    key: 'name',
    label: 'Adı',
    type: 'text',
    required: true,
  },
  {
    key: 'module',
    label: 'Modul',
    type: 'text',
    required: false,
  },
  {
    key: 'submodule',
    label: 'Alt modul',
    type: 'text',
    required: false,
  },
  {
    key: 'responsible_person',
    label: 'Cavabdeh şəxs',
    type: 'text',
    required: false,
  },
  {
    key: 'academic_year',
    label: 'Tədris ili',
    type: 'text',
    required: false,
  },
  {
    key: 'title_az',
    label: 'Başlıq (aze)',
    type: 'text',
    required: true,
  },
  {
    key: 'title_ru',
    label: 'Başlıq (ru)',
    type: 'text',
    required: true,
  },
  {
    key: 'title_en',
    label: 'Başlıq (eng)',
    type: 'text',
    required: true,
  },
  {
    key: 'submission_text_az',
    label: 'Giriş mətni (aze)',
    type: 'text',
    required: true,
  },
  {
    key: 'submission_text_ru',
    label: 'Giriş mətni (ru)',
    type: 'text',
    required: true,
  },
  {
    key: 'submission_text_en',
    label: 'Giriş mətni (eng)',
    type: 'text',
    required: true,
  },
];

export const NEW_APPLICATION_FORM_CONFIRMATION_TEXTS: BaseItem[] = [
  {
    key: 'confirmation_text_az',
    label: 'Təsdiq üçün mətn (aze)',
    type: 'text',
    required: true,
  },
  {
    key: 'confirmation_text_ru',
    label: 'Təsdiq üçün mətn (ru)',
    type: 'text',
    required: true,
  },
  {
    key: 'confirmation_text_en',
    label: 'Təsdiq üçün mətn (eng)',
    type: 'text',
    required: true,
  },
];

export const NEW_APPLICATION_FORM_RULES: TextAreaItem[] = [
  {
    key: 'rules_text_az',
    label: 'Qaydalar (aze)',
  },
  {
    key: 'rules_text_ru',
    label: 'Qaydalar (ru)',
  },
  {
    key: 'rules_text_en',
    label: 'Qaydalar (eng)',
  },
];
