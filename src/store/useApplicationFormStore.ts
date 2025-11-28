import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Technical Info Form Data
export interface TechnicalInfoFormData {
  id: number;
  title: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  submission_text: string;
  submission_text_az: string;
  submission_text_en: string;
  submission_text_ru: string;
  rules_text: string;
  rules_text_az: string;
  rules_text_en: string;
  rules_text_ru: string;
  confirmation_text: string;
  confirmation_text_az: string;
  confirmation_text_en: string;
  confirmation_text_ru: string;
  banner: string;
  name: string;
  slug: string;
  is_enabled: boolean;
  module: {
    id: number;
    name: string;
    name_az: string;
    name_en: string;
    name_ru: string;
  } | null;
  submodule: {
    id: number;
    module: number;
    module_name: string;
    name: string;
    name_az: string;
    name_en: string;
    name_ru: string;
  } | null;
  responsible_person: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  academic_year: {
    id: number;
    name: string;
    name_az: string;
    name_ru: string;
    name_en: string;
    start_date: string;
    end_date: string;
  } | null;
}

// Field Form Data (formerly Cell)
export interface FieldFormData {
  id: string | number;
  label_az: string;
  label_en: string;
  label_ru: string;
  placeholder_az: string;
  placeholder_en: string;
  placeholder_ru: string;
  field_details: string;
  mandatory: boolean;
  order: number;
}

// Page Form Data
export interface PageFormData {
  id: string | number;
  title_az: string;
  title_en: string;
  title_ru: string;
  order: number;
  fields: FieldFormData[];
}

// Application Form Store State
export interface ApplicationFormStore {
  formId: string | null;
  technicalInfo: TechnicalInfoFormData;
  pages: PageFormData[];
  isInitialized: boolean;
  initializedFormId: string | null; // Track which formId was initialized

  // Actions
  setFormId: (id: string | null) => void;
  setTechnicalInfo: (data: Partial<TechnicalInfoFormData>) => void;
  setTechnicalInfoField: (
    key: keyof TechnicalInfoFormData,
    value: string,
  ) => void;
  addPage: () => void;
  deletePage: (pageId: string | number) => void;
  updatePage: (pageId: string | number, data: Partial<PageFormData>) => void;
  addField: (pageId: string | number) => void;
  deleteField: (pageId: string | number, fieldId: string | number) => void;
  updateField: (
    pageId: string | number,
    fieldId: string | number,
    data: Partial<FieldFormData>,
  ) => void;
  initializeFromApi: (apiData: any) => void;
  reset: () => void;
  clearStorage: () => void;
}

const initialTechnicalInfo: TechnicalInfoFormData = {
  id: 0,
  title: '',
  title_az: '',
  title_en: '',
  title_ru: '',
  submission_text: '',
  submission_text_az: '',
  submission_text_en: '',
  submission_text_ru: '',
  rules_text: '',
  rules_text_az: '',
  rules_text_en: '',
  rules_text_ru: '',
  confirmation_text: '',
  confirmation_text_az: '',
  confirmation_text_en: '',
  confirmation_text_ru: '',
  banner: '',
  name: '',
  slug: '',
  is_enabled: true,
  module: null,
  submodule: null,
  responsible_person: null,
  academic_year: null,
};

export const useApplicationFormStore = create<ApplicationFormStore>()(
  persist(
    (set, get) => ({
      formId: null,
      technicalInfo: initialTechnicalInfo,
      pages: [],
      isInitialized: false,
      initializedFormId: null,

      setFormId: (id) => set({ formId: id }),

      setTechnicalInfo: (data) =>
        set((state) => ({
          technicalInfo: { ...state.technicalInfo, ...data },
        })),

      setTechnicalInfoField: (key, value) =>
        set((state) => ({
          technicalInfo: { ...state.technicalInfo, [key]: value },
        })),

      addPage: () =>
        set((state) => {
          const newOrder =
            state.pages.length > 0
              ? Math.max(...state.pages.map((p) => p.order)) + 1
              : 1;
          const newPage: PageFormData = {
            id: Date.now(),
            title_az: '',
            title_en: '',
            title_ru: '',
            order: newOrder,
            fields: [],
          };
          return {
            pages: [...state.pages, newPage],
          };
        }),

      deletePage: (pageId) =>
        set((state) => {
          const filtered = state.pages.filter((page) => page.id !== pageId);
          // Re-order pages
          const reordered = filtered.map((page, index) => ({
            ...page,
            order: index + 1,
          }));
          return { pages: reordered };
        }),

      updatePage: (pageId, data) =>
        set((state) => ({
          pages: state.pages.map((page) =>
            page.id === pageId ? { ...page, ...data } : page,
          ),
        })),

      addField: (pageId) =>
        set((state) => ({
          pages: state.pages.map((page) => {
            if (page.id === pageId) {
              const maxOrder =
                page.fields.length > 0
                  ? Math.max(...page.fields.map((f) => f.order))
                  : 0;
              const newField: FieldFormData = {
                id: Date.now(),
                label_az: '',
                label_en: '',
                label_ru: '',
                placeholder_az: '',
                placeholder_en: '',
                placeholder_ru: '',
                field_details: '',
                mandatory: false,
                order: maxOrder + 1,
              };
              return {
                ...page,
                fields: [...page.fields, newField],
              };
            }
            return page;
          }),
        })),

      deleteField: (pageId, fieldId) =>
        set((state) => ({
          pages: state.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                fields: page.fields.filter((field) => field.id !== fieldId),
              };
            }
            return page;
          }),
        })),

      updateField: (pageId, fieldId, data) =>
        set((state) => ({
          pages: state.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                fields: page.fields.map((field) =>
                  field.id === fieldId ? { ...field, ...data } : field,
                ),
              };
            }
            return page;
          }),
        })),

      initializeFromApi: (apiData) => {
        const currentFormId = get().formId;
        // Map API data to store format
        set({
          technicalInfo: {
            id: apiData.id || 0,
            title: apiData.title || '',
            title_az: apiData.title_az || '',
            title_en: apiData.title_en || '',
            title_ru: apiData.title_ru || '',
            submission_text: apiData.submission_text || '',
            submission_text_az: apiData.submission_text_az || '',
            submission_text_en: apiData.submission_text_en || '',
            submission_text_ru: apiData.submission_text_ru || '',
            rules_text: apiData.rules_text || '',
            rules_text_az: apiData.rules_text_az || '',
            rules_text_en: apiData.rules_text_en || '',
            rules_text_ru: apiData.rules_text_ru || '',
            confirmation_text: apiData.confirmation_text || '',
            confirmation_text_az: apiData.confirmation_text_az || '',
            confirmation_text_en: apiData.confirmation_text_en || '',
            confirmation_text_ru: apiData.confirmation_text_ru || '',
            banner: apiData.banner || '',
            name: apiData.name || '',
            slug: apiData.slug || '',
            is_enabled: apiData.is_enabled ?? true,
            module: apiData.module || null,
            submodule: apiData.submodule || null,
            responsible_person: apiData.responsible_person || null,
            academic_year: apiData.academic_year || null,
          },
          pages: (apiData.pages || []).map((page: any) => ({
            id: page.id,
            title_az: page.title_az || '',
            title_en: page.title_en || '',
            title_ru: page.title_ru || '',
            order: page.order || 0,
            fields: (page.fields || []).map((field: any) => ({
              id: field.id,
              label_az: field.label_az || '',
              label_en: field.label_en || '',
              label_ru: field.label_ru || '',
              placeholder_az: field.placeholder_az || '',
              placeholder_en: field.placeholder_en || '',
              placeholder_ru: field.placeholder_ru || '',
              field_details: Array.isArray(field.field_details)
                ? JSON.stringify(field.field_details)
                : field.field_details || '',
              mandatory: field.mandatory || false,
              order: field.order || 0,
            })),
          })),
          isInitialized: true,
          initializedFormId: currentFormId,
        });
      },

      reset: () =>
        set({
          formId: null,
          technicalInfo: initialTechnicalInfo,
          pages: [],
          isInitialized: false,
          initializedFormId: null,
        }),

      clearStorage: () => {
        // Clear localStorage and reset state
        if (typeof window !== 'undefined') {
          localStorage.removeItem('application-form-storage');
        }
        set({
          formId: null,
          technicalInfo: initialTechnicalInfo,
          pages: [],
          isInitialized: false,
          initializedFormId: null,
        });
      },
    }),
    {
      name: 'application-form-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
