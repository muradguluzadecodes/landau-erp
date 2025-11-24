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
    required: true,
  },
  {
    key: 'subModule',
    label: 'Alt modul',
    type: 'text',
    required: true,
  },
  {
    key: 'responsiblePerson',
    label: 'Cavabdeh şəxs',
    type: 'text',
    required: true,
  },
  {
    key: 'kanbanFullLeads',
    label: 'Kanban və mərhələlər (tam lead-lər)',
    type: 'select',
    required: true,
    options: [
      { label: 'Lead mərhələsi 1', value: 'lead-stage-1' },
      { label: 'Lead mərhələsi 2', value: 'lead-stage-2' },
    ],
  },
  {
    key: 'kanbanPartialLeads',
    label: 'Kanban və mərhələlər (natamam lead-lər)',
    type: 'select',
    required: true,
    options: [
      { label: 'Natamam mərhələ 1', value: 'partial-stage-1' },
      { label: 'Natamam mərhələ 2', value: 'partial-stage-2' },
    ],
  },
  {
    key: 'academicYear',
    label: 'Tədris ili',
    type: 'text',
    required: true,
  },
  {
    key: 'sourceFullLeads',
    label: 'Mənbə (tam lead-lər)',
    type: 'select',
    required: true,
    options: [
      { label: 'Mənbə 1', value: 'source-1' },
      { label: 'Mənbə 2', value: 'source-2' },
    ],
  },
  {
    key: 'sourcePartialLeads',
    label: 'Mənbə (natamam lead-lər)',
    type: 'select',
    required: true,
    options: [
      { label: 'Natamam mənbə 1', value: 'partial-source-1' },
      { label: 'Natamam mənbə 2', value: 'partial-source-2' },
    ],
  },
  {
    key: 'introTextAz',
    label: 'Giriş mətni (aze)',
    type: 'text',
    required: true,
  },
  {
    key: 'introTextRu',
    label: 'Giriş mətni (ru)',
    type: 'text',
    required: true,
  },
  {
    key: 'introTextEn',
    label: 'Giriş mətni (eng)',
    type: 'text',
    required: true,
  },
  {
    key: 'outroTextAz',
    label: 'Son mətni (aze)',
    type: 'text',
    required: true,
  },
  {
    key: 'outroTextRu',
    label: 'Son mətni (ru)',
    type: 'text',
    required: true,
  },
  {
    key: 'outroTextEn',
    label: 'Son mətni (eng)',
    type: 'text',
    required: true,
  },
];

export const NEW_APPLICATION_FORM_CONFIRMATION_TEXTS: BaseItem[] = [
  {
    key: 'approvalTextAz',
    label: 'Təsdiq üçün mətn (aze)',
    type: 'text',
    required: true,
  },
  {
    key: 'approvalTextRu',
    label: 'Təsdiq üçün mətn (ru)',
    type: 'text',
    required: true,
  },
  {
    key: 'approvalTextEn',
    label: 'Təsdiq üçün mətn (eng)',
    type: 'text',
    required: true,
  },
];

export const NEW_APPLICATION_FORM_RULES: TextAreaItem[] = [
  {
    key: 'rulesAz',
    label: 'Qaydalar (aze)',
  },
  {
    key: 'rulesRu',
    label: 'Qaydalar (ru)',
  },
  {
    key: 'rulesEn',
    label: 'Qaydalar (eng)',
  },
];
