import { Shield } from 'lucide-react';
import { useCurrentClock } from '../../hooks/useCurrentClock';

export function DashboardHeader() {
  const { timeStr, dateStr } = useCurrentClock();

  return (
    <header style={{ background: '#0f1320', borderBottom: '1px solid #1e2540', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={18} color="white" />
          </div>
          <div>
            <div style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.3px' }}>로드킬 관제 지원 대시보드</div>
            <div style={{ color: '#64748b', fontSize: '11px' }}>탐지 이벤트 기반 도로 관제 보조 시스템</div>
          </div>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#1e2540', margin: '0 8px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '4px 12px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: 600 }}>시스템 정상 운영 중</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>{timeStr}</div>
          <div style={{ color: '#64748b', fontSize: '11px' }}>{dateStr}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1d2e', border: '1px solid #1e2540', borderRadius: '8px', padding: '6px 12px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', fontWeight: 700 }}>관</div>
          <div>
            <div style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 600 }}>관제 운영자</div>
            <div style={{ color: '#64748b', fontSize: '10px' }}>서울도로관리센터</div>
          </div>
        </div>
      </div>
    </header>
  );
}
