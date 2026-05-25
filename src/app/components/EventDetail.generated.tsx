import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, AlertTriangle, CheckCircle2, Clock, MapPin,
  Camera, Tag, Navigation, Shield, FileText, Send,
  RotateCcw, AlertCircle, Activity, ChevronRight,
  Repeat2, Eye
} from 'lucide-react';
import { EventStatus } from '../data/events';
import { useEvents } from '../contexts/EventsContext';

const STATUS_STEPS: EventStatus[] = ['미확인', '확인 중', '출동 요청', '출동 중', '처리 완료'];

const STATUS_CONFIG: Record<EventStatus, { color: string; bg: string; border: string; icon: React.ReactNode; label: string }> = {
  '미확인': {
    color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)',
    icon: <Eye size={14} />, label: '미확인'
  },
  '확인 중': {
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)',
    icon: <Activity size={14} />, label: '확인 중'
  },
  '출동 요청': {
    color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)',
    icon: <Send size={14} />, label: '출동 요청'
  },
  '출동 중': {
    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',
    icon: <Navigation size={14} />, label: '출동 중'
  },
  '처리 완료': {
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)',
    icon: <CheckCircle2 size={14} />, label: '처리 완료'
  },
  '오탐 처리': {
    color: '#64748b', bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)',
    icon: <RotateCcw size={14} />, label: '오탐 처리'
  },
};

const RISK_CONFIG = {
  '즉시 확인': { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', label: '높음' },
  '순차 확인': { color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)', label: '중간' },
  '후순위 확인': { color: '#64748b', bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)', label: '낮음' },
};

export function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { events, updateEventStatus } = useEvents();
  const [memo, setMemo] = useState('');
  const [savedConfirm, setSavedConfirm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | null>(null);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div style={{ background: '#0b0e1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#94a3b8', textAlign: 'center' }}>
          <AlertCircle size={48} color="#475569" />
          <p style={{ marginTop: '16px', fontSize: '16px' }}>이벤트를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '12px', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← 대시보드로 돌아가기</button>
        </div>
      </div>
    );
  }

  const currentStatus = selectedStatus ?? event.status;
  const risk = RISK_CONFIG[event.riskLevel];

  const handleSave = () => {
    if (selectedStatus && event) {
      updateEventStatus(event.id, selectedStatus);
      setSelectedStatus(null);
    }
    setSavedConfirm(true);
    setTimeout(() => setSavedConfirm(false), 3000);
  };

  const currentStepIndex = STATUS_STEPS.indexOf(currentStatus as EventStatus);

  return (
    <div style={{ background: '#0b0e1a', minHeight: '100vh', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      {/* Header */}
      <header style={{ background: '#0f1320', borderBottom: '1px solid #1e2540', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 50 }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1d2e', border: '1px solid #1e2540', borderRadius: '8px', padding: '8px 14px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#232840'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1a1d2e'; e.currentTarget.style.color = '#94a3b8'; }}
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
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '6px', background: STATUS_CONFIG[currentStatus as EventStatus]?.bg, border: `1px solid ${STATUS_CONFIG[currentStatus as EventStatus]?.border}`, color: STATUS_CONFIG[currentStatus as EventStatus]?.color, fontSize: '12px', fontWeight: 700 }}>
            {STATUS_CONFIG[currentStatus as EventStatus]?.icon}
            {STATUS_CONFIG[currentStatus as EventStatus]?.label}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '28px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Image Preview Card */}
            <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={14} color="#64748b" />
                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>탐지 이미지</span>
                <span style={{ color: '#475569', fontSize: '12px' }}>— {event.cameraId}</span>
              </div>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
                <img
                  src={event.imageUrl}
                  alt="탐지 도로 이미지"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                {/* Bounding Box Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${event.boundingBox.x}%`,
                    top: `${event.boundingBox.y}%`,
                    width: `${event.boundingBox.width}%`,
                    height: `${event.boundingBox.height * 1.8}%`,
                    border: '2px solid #ef4444',
                    boxShadow: '0 0 0 1px rgba(239,68,68,0.3), inset 0 0 0 1px rgba(239,68,68,0.1)',
                    background: 'rgba(239,68,68,0.06)',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '-22px', left: '0',
                    background: '#ef4444', color: 'white',
                    fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px 3px 3px 0',
                    whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px'
                  }}>
                    <AlertTriangle size={9} />
                    탐지 객체
                  </div>
                  {/* Corner accents */}
                  <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '10px', height: '10px', borderTop: '3px solid #ef4444', borderLeft: '3px solid #ef4444' }} />
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', borderTop: '3px solid #ef4444', borderRight: '3px solid #ef4444' }} />
                  <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '10px', height: '10px', borderBottom: '3px solid #ef4444', borderLeft: '3px solid #ef4444' }} />
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', borderBottom: '3px solid #ef4444', borderRight: '3px solid #ef4444' }} />
                </div>

                {/* Image Overlay Info */}
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

            {/* Event Info Panel */}
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
                <InfoRow
                  icon={<Shield size={13} color="#64748b" />}
                  label="위험도"
                  value={risk.label}
                  valueColor={risk.color}
                />
                <InfoRow
                  icon={<Activity size={13} color="#64748b" />}
                  label="현재 상태"
                  value={currentStatus}
                  valueColor={STATUS_CONFIG[currentStatus as EventStatus]?.color}
                />
                <InfoRow
                  icon={<Repeat2 size={13} color="#64748b" />}
                  label="반복 감지"
                  value={event.repeatDetection ? '반복 감지됨' : '최초 감지'}
                  valueColor={event.repeatDetection ? '#ef4444' : '#22c55e'}
                />
              </div>
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ background: '#0d1020', border: '1px solid #1e2540', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '6px' }}>상황 설명</div>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{event.description}</p>
                </div>
              </div>
            </div>

            {/* Risk Reason Card */}
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
          </div>

          {/* Right Column: Status Management */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
            {/* Status Timeline */}
            <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={14} color="#64748b" />
                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>상태 타임라인</span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ position: 'relative' }}>
                  {STATUS_STEPS.map((step, idx) => {
                    const isActive = idx <= currentStepIndex && currentStatus !== '오탐 처리';
                    const isCurrent = step === currentStatus;
                    const cfg = STATUS_CONFIG[step];
                    return (
                      <div key={step} style={{ display: 'flex', gap: '14px', marginBottom: idx < STATUS_STEPS.length - 1 ? '4px' : '0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: isActive ? cfg.bg : '#1a1d2e',
                            border: `2px solid ${isActive ? cfg.color : '#2a2d3d'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.3s',
                          }}>
                            <span style={{ color: isActive ? cfg.color : '#475569' }}>
                              {isActive ? <CheckCircle2 size={12} /> : <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2a2d3d' }} />}
                            </span>
                          </div>
                          {idx < STATUS_STEPS.length - 1 && (
                            <div style={{ width: '2px', height: '24px', background: isActive ? cfg.color + '40' : '#1e2540', marginTop: '2px', marginBottom: '2px' }} />
                          )}
                        </div>
                        <div style={{ paddingTop: '5px', paddingBottom: idx < STATUS_STEPS.length - 1 ? '20px' : '0' }}>
                          <div style={{ color: isActive ? cfg.color : '#475569', fontSize: '13px', fontWeight: isCurrent ? 700 : 500 }}>
                            {step}
                            {isCurrent && currentStatus !== '오탐 처리' && (
                              <span style={{ marginLeft: '6px', background: cfg.bg, color: cfg.color, fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>현재</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {currentStatus === '오탐 처리' && (
                    <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: STATUS_CONFIG['오탐 처리'].bg, border: `2px solid ${STATUS_CONFIG['오탐 처리'].color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <RotateCcw size={12} color={STATUS_CONFIG['오탐 처리'].color} />
                      </div>
                      <div style={{ paddingTop: '5px' }}>
                        <div style={{ color: STATUS_CONFIG['오탐 처리'].color, fontSize: '13px', fontWeight: 700 }}>
                          오탐 처리
                          <span style={{ marginLeft: '6px', background: STATUS_CONFIG['오탐 처리'].bg, color: STATUS_CONFIG['오탐 처리'].color, fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: 700 }}>현재</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Action Buttons */}
            <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={14} color="#64748b" />
                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>상태 변경</span>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(['미확인', '확인 중', '출동 요청', '출동 중', '처리 완료', '오탐 처리'] as EventStatus[]).map(s => {
                  const cfg = STATUS_CONFIG[s];
                  const isSelected = currentStatus === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedStatus(s)}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: '8px',
                        background: isSelected ? cfg.bg : '#1a1d2e',
                        border: `1px solid ${isSelected ? cfg.border : '#2a2d3d'}`,
                        color: isSelected ? cfg.color : '#64748b',
                        fontSize: '13px', fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = '#232840'; e.currentTarget.style.color = '#94a3b8'; } }}
                      onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = '#1a1d2e'; e.currentTarget.style.color = '#64748b'; } }}
                    >
                      <span style={{ color: isSelected ? cfg.color : '#475569' }}>{cfg.icon}</span>
                      {cfg.label}
                      {isSelected && <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.7 }}>선택됨</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Memo Input & Save */}
            <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={14} color="#64748b" />
                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>처리 메모</span>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                  value={memo}
                  onChange={e => setMemo(e.target.value)}
                  placeholder="처리 메모를 입력하세요..."
                  rows={4}
                  style={{
                    width: '100%', background: '#0d1020', border: '1px solid #1e2540',
                    borderRadius: '8px', padding: '10px 12px', color: '#cbd5e1',
                    fontSize: '13px', resize: 'none', outline: 'none',
                    fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
                    lineHeight: 1.6, boxSizing: 'border-box'
                  }}
                />
                <button
                  onClick={handleSave}
                  style={{
                    width: '100%', padding: '11px', borderRadius: '8px',
                    background: savedConfirm ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)',
                    border: `1px solid ${savedConfirm ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'}`,
                    color: savedConfirm ? '#22c55e' : '#60a5fa',
                    fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    transition: 'all 0.2s',
                  }}
                >
                  {savedConfirm ? (
                    <><CheckCircle2 size={14} />저장 완료</>
                  ) : (
                    <><Shield size={14} />상태 저장</>
                  )}
                </button>

                {savedConfirm && (
                  <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={13} color="#22c55e" />
                    <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 600 }}>상태가 성공적으로 저장되었습니다.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon, label, value, valueColor, full
}: {
  icon: React.ReactNode; label: string; value: string;
  valueColor?: string; full?: boolean;
}) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '11px', marginBottom: '4px' }}>
        {icon}
        {label}
      </div>
      <div style={{ color: valueColor || '#cbd5e1', fontSize: '13px', fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function RiskReasonRow({
  icon, color, text, badge, badgeColor, active
}: {
  icon: React.ReactNode; color: string; text: string;
  badge?: string; badgeColor?: string; active?: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: active ? `${color}0d` : '#0d1020', border: `1px solid ${active ? color + '25' : '#1e2540'}`, borderRadius: '8px' }}>
      <span style={{ color: active ? color : '#475569', flexShrink: 0 }}>{icon}</span>
      <span style={{ color: active ? '#cbd5e1' : '#475569', fontSize: '12px', flex: 1 }}>{text}</span>
      {badge && (
        <span style={{ background: `${badgeColor}18`, color: badgeColor, fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', border: `1px solid ${badgeColor}30`, whiteSpace: 'nowrap' }}>{badge}</span>
      )}
    </div>
  );
}
