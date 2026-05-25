import { AlertTriangle, Camera } from 'lucide-react';
import type { RoadkillEvent } from '../../types/events';

interface DetectionImageCardProps {
  event: RoadkillEvent;
}

export function DetectionImageCard({ event }: DetectionImageCardProps) {
  return (
    <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Camera size={14} color="#64748b" />
        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>탐지 이미지</span>
        <span style={{ color: '#475569', fontSize: '12px' }}>— {event.cameraId}</span>
      </div>
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
        <img src={event.imageUrl} alt="탐지 도로 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
        <div style={{ position: 'absolute', left: `${event.boundingBox.x}%`, top: `${event.boundingBox.y}%`, width: `${event.boundingBox.width}%`, height: `${event.boundingBox.height * 1.8}%`, border: '2px solid #ef4444', boxShadow: '0 0 0 1px rgba(239,68,68,0.3), inset 0 0 0 1px rgba(239,68,68,0.1)', background: 'rgba(239,68,68,0.06)' }}>
          <div style={{ position: 'absolute', top: '-22px', left: '0', background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px 3px 3px 0', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <AlertTriangle size={9} />
            탐지 객체
          </div>
          <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '10px', height: '10px', borderTop: '3px solid #ef4444', borderLeft: '3px solid #ef4444' }} />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', borderTop: '3px solid #ef4444', borderRight: '3px solid #ef4444' }} />
          <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '10px', height: '10px', borderBottom: '3px solid #ef4444', borderLeft: '3px solid #ef4444' }} />
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', borderBottom: '3px solid #ef4444', borderRight: '3px solid #ef4444' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '8px' }}>
          <div style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', borderRadius: '6px', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#94a3b8', fontSize: '9px', marginBottom: '1px' }}>탐지 시각</div>
            <div style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 600 }}>{event.detectedAt}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', borderRadius: '6px', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#94a3b8', fontSize: '9px', marginBottom: '1px' }}>탐지 객체</div>
            <div style={{ color: '#fca5a5', fontSize: '12px', fontWeight: 600 }}>{event.objectType}</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', borderRadius: '6px', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#94a3b8', fontSize: '9px', marginBottom: '1px' }}>신뢰도</div>
          <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: 700 }}>94.2%</div>
        </div>
      </div>
    </div>
  );
}
