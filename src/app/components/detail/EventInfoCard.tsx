import { Activity, AlertCircle, Camera, Clock, FileText, MapPin, Repeat2, Shield, Tag } from 'lucide-react';
import { RISK_DISPLAY, STATUS_DISPLAY } from '../../constants/eventDisplay';
import type { EventStatus, RoadkillEvent } from '../../types/events';
import { InfoRow } from './InfoRow';

interface EventInfoCardProps {
  event: RoadkillEvent;
  currentStatus: EventStatus;
}

export function EventInfoCard({ event, currentStatus }: EventInfoCardProps) {
  const risk = RISK_DISPLAY[event.riskLevel];
  const status = STATUS_DISPLAY[currentStatus];

  return (
    <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileText size={14} color="#64748b" />
        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>이벤트 정보</span>
      </div>
      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <InfoRow icon={<Tag size={13} color="#64748b" />} label="이벤트 ID" value={event.id} valueColor="#60a5fa" />
        <InfoRow icon={<Clock size={13} color="#64748b" />} label="발생 시각" value={event.detectedAt} />
        <InfoRow icon={<MapPin size={13} color="#64748b" />} label="위치" value={event.location} full />
        <InfoRow icon={<AlertCircle size={13} color="#64748b" />} label="객체 유형" value={event.objectType} valueColor="#fca5a5" />
        <InfoRow icon={<Camera size={13} color="#64748b" />} label="카메라 ID" value={event.cameraId} />
        <InfoRow icon={<Shield size={13} color="#64748b" />} label="위험도" value={risk.label} valueColor={risk.color} />
        <InfoRow icon={<Activity size={13} color="#64748b" />} label="현재 상태" value={currentStatus} valueColor={status.color} />
        <InfoRow icon={<Repeat2 size={13} color="#64748b" />} label="반복 감지" value={event.repeatDetection ? '반복 감지됨' : '최초 감지'} valueColor={event.repeatDetection ? '#ef4444' : '#22c55e'} />
      </div>
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ background: '#0d1020', border: '1px solid #1e2540', borderRadius: '8px', padding: '14px' }}>
          <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '6px' }}>상황 설명</div>
          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{event.description}</p>
        </div>
      </div>
    </div>
  );
}
