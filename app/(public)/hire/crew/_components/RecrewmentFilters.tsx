import { Filters, Role, Class, Spec } from '@/constants/WOW';
import { Group, MultiSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

export default function RecruitmentFilters({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  return (
    <Group grow>
      <DatePickerInput
        type="range"
        placeholder="날짜"
        value={filters.dateRange}
        onChange={(v) => setFilters((f) => ({ ...f, dateRange: v }))}
        clearable
      />

      <MultiSelect
        placeholder="역할"
        data={['TANK', 'HEALER', 'DPS']}
        value={filters.roles}
        onChange={(v) => setFilters({ ...filters, roles: v as Role[], classes: [], specs: [] })}
      />

      <MultiSelect
        placeholder="클래스"
        data={availableClasses}
        value={filters.classes}
        onChange={(v) => setFilters((f) => ({ ...f, classes: v as Class[], specs: [] }))}
      />

      <MultiSelect
        placeholder="특성"
        data={availableSpecs}
        value={filters.specs}
        onChange={(v) => setFilters((f) => ({ ...f, specs: v as Spec[] }))}
      />
    </Group>
  );
}
