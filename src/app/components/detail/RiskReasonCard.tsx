import type { ReactNode } from 'react';
import { AlertTriangle, Repeat2 } from 'lucide-react';
import type { RoadkillEvent } from '../../types/events';

interface RiskReasonRowProps {
  icon: ReactNode;
  color: string;
  text: string;
  badge?: string;
  badgeColor?: string;
  active?: boolean;
}

function RiskReasonRow({ icon, color, text, badge, badgeColor, active }: RiskReasonRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: active ? `${color}0d` : '#0d1020', border: `1px solid ${active ? color + '25' : '#1e2540'}`, borderRadius: '8px' }}>
      <span style={{ color: active ? color : '#475569', flexShrink: 0 }}>{icon}</span>
      <span style={{ color: active ? '#cbd5e1' : '#475569', fontSize: '12px', flex: 1 }}>{text}</span>
      {badge && <span style={{ background: `${badgeColor}18`, color: badgeColor, fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', border: `1px solid ${badgeColor}30`, whiteSpace: 'nowrap' }}>{badge}</span>}
    </div>
  );
}

interface RiskReasonCardProps {
  event: RoadkillEvent;
}

export function RiskReasonCard({ event }: RiskReasonCardProps) {
  return (
    <div style={{ background: '#111422', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.05)' }}>
        <AlertTriangle size={14} color="#ef4444" />
        <span style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>위험 판단 근거</span>
      </div>
      <div style={{ padding: '20px' }}>
        <RiskReasonRow
          icon={<Repeat2 size={13} />}
          color={event.repeatDetection ? '#ef4444' : '#22c55e'}
          text="동일 위치 반복 감지 여부"
          badge={event.repeatDetection ? '반복 감지됨 - 위험도 상승' : '최초 감지 - 정상'}
          badgeColor={event.repeatDetection ? '#ef4444' : '#22c55e'}
          active
        />
      </div>
    </div>
  );
}
