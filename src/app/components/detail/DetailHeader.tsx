import { AlertTriangle, ArrowLeft, ChevronRight } from 'lucide-react';
import { RISK_DISPLAY, STATUS_DISPLAY } from '../../constants/eventDisplay';
import type { EventStatus, RoadkillEvent } from '../../types/events';

interface DetailHeaderProps {
  event: RoadkillEvent;
  currentStatus: EventStatus;
  onBack: () => void;
}

export function DetailHeader({ event, currentStatus, onBack }: DetailHeaderProps) {
  const risk = RISK_DISPLAY[event.riskLevel];
  const status = STATUS_DISPLAY[currentStatus];

  return (
    <header style={{ background: '#0f1320', borderBottom: '1px solid #1e2540', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 50 }}>
      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1d2e', border: '1px solid #1e2540', borderRadius: '8px', padding: '8px 14px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
        onMouseEnter={event => { event.currentTarget.style.background = '#232840'; event.currentTarget.style.color = '#e2e8f0'; }}
        onMouseLeave={event => { event.currentTarget.style.background = '#1a1d2e'; event.currentTarget.style.color = '#94a3b8'; }}
      >
        <ArrowLeft size={14} />
        대시보드
      </button>

      <div style={{ width: '1px', height: '28px', background: '#1e2540' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#64748b', fontSize: '12px' }}>이벤트 상세</span>
        <ChevronRight size={12} color="#475569" />
        <span style={{ color: '#60a5fa', fontSize: '13px', fontWeight: 600 }}>{event.id}</span>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '6px', background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color, fontSize: '12px', fontWeight: 700 }}>
          <AlertTriangle size={12} />
          위험도: {risk.label}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '6px', background: status.bg, border: `1px solid ${status.border}`, color: status.color, fontSize: '12px', fontWeight: 700 }}>
          {status.icon}
          {status.label}
        </span>
      </div>
    </header>
  );
}
