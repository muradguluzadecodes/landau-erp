import { create } from 'zustand';

export interface UserFiltersState {
  assigned_permission__custom_permission?: number | null;
  created_at_after?: string | null;
  created_at_before?: string | null;
  department?: number | null;
  educational_institution?: number | null;
  is_active?: boolean | null;
  is_staff?: boolean | null;
  ordering?: string | null;
  page: number;
  page_size: number;
  position?: number | null;
  search?: string | null;

  // actions
  setFilter: (key: string, value: any) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
}

export const useUserFilters = create<UserFiltersState>((set) => ({
  assigned_permission__custom_permission: null,
  created_at_after: null,
  created_at_before: null,
  department: null,
  educational_institution: null,
  is_active: null,
  is_staff: null,
  ordering: null,
  page: 1,
  page_size: 10,
  position: null,
  search: null,

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
      page: 1, // reset to first page when filters change
    })),

  setPage: (page) => set({ page }),
  setPageSize: (size) =>
    set({
      page_size: size,
      page: 1,
    }),

  resetFilters: () =>
    set({
      assigned_permission__custom_permission: null,
      created_at_after: null,
      created_at_before: null,
      department: null,
      educational_institution: null,
      is_active: null,
      is_staff: null,
      ordering: null,
      page: 1,
      page_size: 10,
      position: null,
      search: null,
    }),
}));
