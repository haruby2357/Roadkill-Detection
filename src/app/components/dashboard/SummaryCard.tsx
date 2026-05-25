import type { ReactNode } from 'react';
import type { FilterChip } from '../../hooks/useEventFilters';

interface SummaryCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  accent: string;
  sublabel: string;
  pulse?: boolean;
  filter: FilterChip;
  activeFilter: FilterChip;
  onClick: () => void;
}

export function SummaryCard({ label, value, icon, accent, sublabel, pulse, filter, activeFilter, onClick }: SummaryCardProps) {
  const isActive = filter === activeFilter;

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? `${accent}15` : '#111422',
        border: `1px solid ${isActive ? `${accent}60` : `${accent}22`}`,
        borderRadius: '12px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s',
        transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isActive ? `0 4px 12px ${accent}30` : 'none',
      }}
      onMouseEnter={event => {
        if (!isActive) {
          event.currentTarget.style.background = '#151825';
          event.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={event => {
        if (!isActive) {
          event.currentTarget.style.background = '#111422';
          event.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isActive ? '3px' : '2px', background: accent }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: `${accent}18`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        {pulse && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444', animation: 'pulse 2s infinite' }} />}
      </div>
      <div style={{ color: '#e2e8f0', fontSize: '32px', fontWeight: 700, lineHeight: 1, marginBottom: '6px' }}>{value}</div>
      <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{label}</div>
      <div style={{ color: '#475569', fontSize: '11px' }}>{sublabel}</div>
    </div>
  );
}
