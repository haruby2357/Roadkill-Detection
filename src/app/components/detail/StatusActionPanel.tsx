import { Shield } from 'lucide-react';
import { STATUS_DISPLAY } from '../../constants/eventDisplay';
import type { EventStatus } from '../../types/events';

const statusOptions: EventStatus[] = ['미확인', '확인 중', '출동 요청', '출동 중', '처리 완료', '오탐 처리'];

interface StatusActionPanelProps {
  currentStatus: EventStatus;
  onSelectStatus: (status: EventStatus) => void;
}

export function StatusActionPanel({ currentStatus, onSelectStatus }: StatusActionPanelProps) {
  return (
    <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Shield size={14} color="#64748b" />
        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>상태 변경</span>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {statusOptions.map(status => {
          const config = STATUS_DISPLAY[status];
          const isSelected = currentStatus === status;
          return (
            <button
              key={status}
              onClick={() => onSelectStatus(status)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: isSelected ? config.bg : '#1a1d2e', border: `1px solid ${isSelected ? config.border : '#2a2d3d'}`, color: isSelected ? config.color : '#64748b', fontSize: '13px', fontWeight: isSelected ? 700 : 500, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s' }}
              onMouseEnter={event => { if (!isSelected) { event.currentTarget.style.background = '#232840'; event.currentTarget.style.color = '#94a3b8'; } }}
              onMouseLeave={event => { if (!isSelected) { event.currentTarget.style.background = '#1a1d2e'; event.currentTarget.style.color = '#64748b'; } }}
            >
              <span style={{ color: isSelected ? config.color : '#475569' }}>{config.icon}</span>
              {config.label}
              {isSelected && <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.7 }}>선택됨</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
