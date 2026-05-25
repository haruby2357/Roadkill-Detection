import { Activity, CheckCircle2, RotateCcw } from 'lucide-react';
import { STATUS_DISPLAY, STATUS_STEPS } from '../../constants/eventDisplay';
import type { EventStatus } from '../../types/events';

interface StatusTimelineProps {
  currentStatus: EventStatus;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentStepIndex = STATUS_STEPS.indexOf(currentStatus);

  return (
    <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Activity size={14} color="#64748b" />
        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>상태 타임라인</span>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ position: 'relative' }}>
          {STATUS_STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex && currentStatus !== '오탐 처리';
            const isCurrent = step === currentStatus;
            const config = STATUS_DISPLAY[step];
            return (
              <div key={step} style={{ display: 'flex', gap: '14px', marginBottom: index < STATUS_STEPS.length - 1 ? '4px' : '0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isActive ? config.bg : '#1a1d2e', border: `2px solid ${isActive ? config.color : '#2a2d3d'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                    <span style={{ color: isActive ? config.color : '#475569' }}>{isActive ? <CheckCircle2 size={12} /> : <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2a2d3d' }} />}</span>
                  </div>
                  {index < STATUS_STEPS.length - 1 && <div style={{ width: '2px', height: '24px', background: isActive ? config.color + '40' : '#1e2540', marginTop: '2px', marginBottom: '2px' }} />}
                </div>
                <div style={{ paddingTop: '5px', paddingBottom: index < STATUS_STEPS.length - 1 ? '20px' : '0' }}>
                  <div style={{ color: isActive ? config.color : '#475569', fontSize: '13px', fontWeight: isCurrent ? 700 : 500 }}>
                    {step}
                    {isCurrent && currentStatus !== '오탐 처리' && <span style={{ marginLeft: '6px', background: config.bg, color: config.color, fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>현재</span>}
                  </div>
                </div>
              </div>
            );
          })}
          {currentStatus === '오탐 처리' && (
            <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: STATUS_DISPLAY['오탐 처리'].bg, border: `2px solid ${STATUS_DISPLAY['오탐 처리'].color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <RotateCcw size={12} color={STATUS_DISPLAY['오탐 처리'].color} />
              </div>
              <div style={{ paddingTop: '5px' }}>
                <div style={{ color: STATUS_DISPLAY['오탐 처리'].color, fontSize: '13px', fontWeight: 700 }}>
                  오탐 처리
                  <span style={{ marginLeft: '6px', background: STATUS_DISPLAY['오탐 처리'].bg, color: STATUS_DISPLAY['오탐 처리'].color, fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>현재</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
