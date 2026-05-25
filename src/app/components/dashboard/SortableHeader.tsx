import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import type { SortDirection, SortField } from '../../hooks/useEventFilters';

interface SortableHeaderProps {
  label: string;
  field: SortField;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function SortableHeader({ label, field, sortField, sortDirection, onSort }: SortableHeaderProps) {
  const isActive = sortField === field;

  return (
    <button
      onClick={() => onSort(field)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        color: isActive ? '#60a5fa' : '#475569',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'color 0.15s',
      }}
      onMouseEnter={event => { if (!isActive) event.currentTarget.style.color = '#64748b'; }}
      onMouseLeave={event => { if (!isActive) event.currentTarget.style.color = '#475569'; }}
    >
      {label}
      {isActive && sortDirection === 'asc' && <ArrowUp size={11} />}
      {isActive && sortDirection === 'desc' && <ArrowDown size={11} />}
      {!isActive && <ArrowUpDown size={11} style={{ opacity: 0.3 }} />}
    </button>
  );
}
