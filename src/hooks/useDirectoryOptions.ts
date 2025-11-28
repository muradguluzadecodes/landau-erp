import { Directories } from '@/lib/types';
import { useAllDepartments } from '@/queries/departments/useAllDepartments';
import { useAllInstituons } from '@/queries/institutions/useAllInstituons';
import { useAllPositions } from '@/queries/positions/useAllPositions';

export function useDirectories() {
  const { data: institutionsData, isLoading: institutionsLoading } =
    useAllInstituons();
  const { data: departmentsData, isLoading: departmentsLoading } =
    useAllDepartments();
  const { data: positionsData, isLoading: positionsLoading } =
    useAllPositions();

  const directories: Directories = {
    institutions: institutionsData?.results || [],
    departments: departmentsData?.results || [],
    positions: positionsData?.results || [],
  };

  return {
    directories,

    isLoading: institutionsLoading || departmentsLoading || positionsLoading,
  };
}
