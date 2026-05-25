import { ListFilter, Search } from 'lucide-react';
import type { FilterChip } from '../../hooks/useEventFilters';

interface DashboardFiltersProps {
  activeFilter: FilterChip;
  searchQuery: string;
  onFilterChange: (filter: FilterChip) => void;
  onSearchChange: (value: string) => void;
}

const riskFilters: FilterChip[] = ['즉시 확인', '순차 확인', '후순위 확인'];
const statusFilters: FilterChip[] = ['미확인', '처리 중', '처리 완료'];

export function DashboardFilters({ activeFilter, searchQuery, onFilterChange, onSearchChange }: DashboardFiltersProps) {
  const renderFilterButton = (chip: FilterChip) => (
    <button
      key={chip}
      onClick={() => onFilterChange(chip)}
      style={{
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
        border: activeFilter === chip ? '1px solid rgba(59,130,246,0.6)' : '1px solid #1e2540',
        background: activeFilter === chip ? 'rgba(59,130,246,0.15)' : '#1a1d2e',
        color: activeFilter === chip ? '#60a5fa' : '#94a3b8',
      }}
    >
      {chip}
    </button>
  );

  return (
    <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', marginRight: '4px' }}>
          <ListFilter size={14} />
          <span style={{ fontSize: '12px' }}>필터</span>
        </div>
        {renderFilterButton('전체')}
        <div style={{ width: '1px', height: '20px', background: '#1e2540', margin: '0 4px' }} />
        {riskFilters.map(renderFilterButton)}
        <div style={{ width: '1px', height: '20px', background: '#1e2540', margin: '0 4px' }} />
        {statusFilters.map(renderFilterButton)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1d2e', border: '1px solid #1e2540', borderRadius: '8px', padding: '8px 14px', minWidth: '280px' }}>
        <Search size={14} color="#64748b" />
        <input
          type="text"
          placeholder="위치 또는 객체 유형 검색"
          value={searchQuery}
          onChange={event => onSearchChange(event.target.value)}
          style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '13px', width: '100%' }}
        />
      </div>
    </div>
  );
}
