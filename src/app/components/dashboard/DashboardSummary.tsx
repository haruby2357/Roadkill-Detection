import { Activity, AlertTriangle, BarChart3, CheckCircle2, Eye } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import type { FilterChip } from '../../hooks/useEventFilters';

interface DashboardSummaryProps {
  summary: {
    totalCount: number;
    unconfirmedCount: number;
    immediateCount: number;
    processingCount: number;
    completedCount: number;
  };
  activeFilter: FilterChip;
  onFilterChange: (filter: FilterChip) => void;
}

export function DashboardSummary({ summary, activeFilter, onFilterChange }: DashboardSummaryProps) {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
      <SummaryCard
        label="즉시 확인"
        value={summary.immediateCount}
        icon={<AlertTriangle size={18} color="#ef4444" />}
        accent="#ef4444"
        sublabel="긴급 대응 필요"
        pulse
        filter="즉시 확인"
        activeFilter={activeFilter}
        onClick={() => onFilterChange('즉시 확인')}
      />
      <div style={{ width: '2px', background: '#1e2540', margin: '0 4px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flex: 1 }}>
        <SummaryCard
          label="전체 이벤트"
          value={summary.totalCount}
          icon={<BarChart3 size={18} color="#3b82f6" />}
          accent="#3b82f6"
          sublabel="오늘 탐지된 이벤트"
          filter="전체"
          activeFilter={activeFilter}
          onClick={() => onFilterChange('전체')}
        />
        <SummaryCard
          label="미확인"
          value={summary.unconfirmedCount}
          icon={<Eye size={18} color="#94a3b8" />}
          accent="#94a3b8"
          sublabel="확인 대기 중"
          filter="미확인"
          activeFilter={activeFilter}
          onClick={() => onFilterChange('미확인')}
        />
        <SummaryCard
          label="처리 중"
          value={summary.processingCount}
          icon={<Activity size={18} color="#f97316" />}
          accent="#f97316"
          sublabel="확인 중 + 출동 요청 + 출동 중"
          filter="처리 중"
          activeFilter={activeFilter}
          onClick={() => onFilterChange('처리 중')}
        />
        <SummaryCard
          label="처리 완료"
          value={summary.completedCount}
          icon={<CheckCircle2 size={18} color="#22c55e" />}
          accent="#22c55e"
          sublabel="처리 완료 + 오탐 처리"
          filter="처리 완료"
          activeFilter={activeFilter}
          onClick={() => onFilterChange('처리 완료')}
        />
      </div>
    </div>
  );
}
