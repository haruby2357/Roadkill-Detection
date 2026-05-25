import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle, CheckCircle2, Clock, ListFilter,
  Search, ChevronRight, Activity, Shield, Eye,
  AlertCircle, BarChart3, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
import { RoadkillEvent, RiskLevel, EventStatus } from '../data/events';
import { useEvents } from '../contexts/EventsContext';

type SortField = 'riskLevel' | 'detectedAt' | 'location' | 'repeatDetection' | 'status';
type SortDirection = 'asc' | 'desc' | null;

const RISK_CONFIG: Record<RiskLevel, { color: string; bg: string; border: string; dot: string; icon: React.ReactNode }> = {
  '즉시 확인': {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    dot: '#ef4444',
    icon: <AlertTriangle size={12} />,
  },
  '순차 확인': {
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.3)',
    dot: '#f97316',
    icon: <Clock size={12} />,
  },
  '후순위 확인': {
    color: '#64748b',
    bg: 'rgba(100,116,139,0.12)',
    border: 'rgba(100,116,139,0.3)',
    dot: '#64748b',
    icon: <Eye size={12} />,
  },
};

const STATUS_CONFIG: Record<EventStatus, { color: string; bg: string; label: string }> = {
  '미확인': { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', label: '미확인' },
  '확인 중': { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', label: '확인 중' },
  '출동 요청': { color: '#f97316', bg: 'rgba(249,115,22,0.12)', label: '출동 요청' },
  '출동 중': { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', label: '출동 중' },
  '처리 완료': { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', label: '처리 완료' },
  '오탐 처리': { color: '#64748b', bg: 'rgba(100,116,139,0.12)', label: '오탐 처리' },
};

type FilterChip = '전체' | RiskLevel | '미확인' | '처리 중' | '처리 완료';

export function Dashboard() {
  const navigate = useNavigate();
  const { events: mockEvents } = useEvents();
  const [activeFilter, setActiveFilter] = useState<FilterChip>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });

  const totalCount = mockEvents.length;
  const unconfirmedCount = mockEvents.filter(e => e.status === '미확인').length;
  const immediateCount = mockEvents.filter(e => e.riskLevel === '즉시 확인').length;
  const processingCount = mockEvents.filter(e => e.status === '확인 중' || e.status === '출동 요청' || e.status === '출동 중').length;
  const completedCount = mockEvents.filter(e => e.status === '처리 완료' || e.status === '오탐 처리').length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') { setSortField(null); setSortDirection(null); }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredEvents = useMemo(() => {
    let events = [...mockEvents];

    if (activeFilter !== '전체') {
      events = events.filter(e => {
        if (activeFilter === '미확인') return e.status === '미확인';
        if (activeFilter === '처리 중') return e.status === '확인 중' || e.status === '출동 요청' || e.status === '출동 중';
        if (activeFilter === '처리 완료') return e.status === '처리 완료' || e.status === '오탐 처리';
        return e.riskLevel === activeFilter;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter(e =>
        e.location.toLowerCase().includes(q) ||
        e.objectType.toLowerCase().includes(q)
      );
    }

    if (sortField && sortDirection) {
      events.sort((a, b) => {
        let aVal: any = a[sortField];
        let bVal: any = b[sortField];

        if (sortField === 'riskLevel') {
          const riskOrder = { '즉시 확인': 0, '순차 확인': 1, '후순위 확인': 2 };
          aVal = riskOrder[a.riskLevel];
          bVal = riskOrder[b.riskLevel];
        } else if (sortField === 'repeatDetection') {
          aVal = a.repeatDetection ? 1 : 0;
          bVal = b.repeatDetection ? 1 : 0;
        } else if (sortField === 'status') {
          const statusOrder: Record<EventStatus, number> = { '미확인': 0, '확인 중': 1, '출동 요청': 2, '출동 중': 3, '처리 완료': 4, '오탐 처리': 5 };
          aVal = statusOrder[a.status];
          bVal = statusOrder[b.status];
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return events;
  }, [activeFilter, searchQuery, sortField, sortDirection]);

  return (
    <div style={{ background: '#0b0e1a', minHeight: '100vh', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      {/* Top Header */}
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

      {/* Main Content */}
      <main style={{ padding: '28px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
          <SummaryCard
            label="즉시 확인"
            value={immediateCount}
            icon={<AlertTriangle size={18} color="#ef4444" />}
            accent="#ef4444"
            sublabel="긴급 대응 필요"
            pulse
            filter="즉시 확인"
            activeFilter={activeFilter}
            onClick={() => setActiveFilter('즉시 확인')}
          />
          <div style={{ width: '2px', background: '#1e2540', margin: '0 4px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flex: 1 }}>
            <SummaryCard
              label="전체 이벤트"
              value={totalCount}
              icon={<BarChart3 size={18} color="#3b82f6" />}
              accent="#3b82f6"
              sublabel="오늘 탐지된 이벤트"
              filter="전체"
              activeFilter={activeFilter}
              onClick={() => setActiveFilter('전체')}
            />
            <SummaryCard
              label="미확인"
              value={unconfirmedCount}
              icon={<Eye size={18} color="#94a3b8" />}
              accent="#94a3b8"
              sublabel="확인 대기 중"
              filter="미확인"
              activeFilter={activeFilter}
              onClick={() => setActiveFilter('미확인')}
            />
            <SummaryCard
              label="처리 중"
              value={processingCount}
              icon={<Activity size={18} color="#f97316" />}
              accent="#f97316"
              sublabel="확인 중 + 출동 요청 + 출동 중"
              filter="처리 중"
              activeFilter={activeFilter}
              onClick={() => setActiveFilter('처리 중')}
            />
            <SummaryCard
              label="처리 완료"
              value={completedCount}
              icon={<CheckCircle2 size={18} color="#22c55e" />}
              accent="#22c55e"
              sublabel="처리 완료 + 오탐 처리"
              filter="처리 완료"
              activeFilter={activeFilter}
              onClick={() => setActiveFilter('처리 완료')}
            />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', marginRight: '4px' }}>
              <ListFilter size={14} />
              <span style={{ fontSize: '12px' }}>필터</span>
            </div>

            {/* 전체 */}
            <button
              onClick={() => setActiveFilter('전체')}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                border: activeFilter === '전체' ? '1px solid rgba(59,130,246,0.6)' : '1px solid #1e2540',
                background: activeFilter === '전체' ? 'rgba(59,130,246,0.15)' : '#1a1d2e',
                color: activeFilter === '전체' ? '#60a5fa' : '#94a3b8',
              }}
            >
              전체
            </button>

            <div style={{ width: '1px', height: '20px', background: '#1e2540', margin: '0 4px' }} />

            {/* 우선순위 그룹 */}
            {(['즉시 확인', '순차 확인', '후순위 확인'] as FilterChip[]).map(chip => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  border: activeFilter === chip ? '1px solid rgba(59,130,246,0.6)' : '1px solid #1e2540',
                  background: activeFilter === chip ? 'rgba(59,130,246,0.15)' : '#1a1d2e',
                  color: activeFilter === chip ? '#60a5fa' : '#94a3b8',
                }}
              >
                {chip}
              </button>
            ))}

            <div style={{ width: '1px', height: '20px', background: '#1e2540', margin: '0 4px' }} />

            {/* 상태 그룹 */}
            {(['미확인', '처리 중', '처리 완료'] as FilterChip[]).map(chip => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  border: activeFilter === chip ? '1px solid rgba(59,130,246,0.6)' : '1px solid #1e2540',
                  background: activeFilter === chip ? 'rgba(59,130,246,0.15)' : '#1a1d2e',
                  color: activeFilter === chip ? '#60a5fa' : '#94a3b8',
                }}
              >
                {chip}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1d2e', border: '1px solid #1e2540', borderRadius: '8px', padding: '8px 14px', minWidth: '280px' }}>
            <Search size={14} color="#64748b" />
            <input
              type="text"
              placeholder="위치 또는 객체 유형 검색"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '13px', width: '100%' }}
            />
          </div>
        </div>

        {/* Event Table */}
        <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={15} color="#3b82f6" />
              <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>이벤트 목록</span>
              <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.2)' }}>{filteredEvents.length}건</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <RefreshCw size={12} />
              새로고침
            </button>
          </div>

          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '150px 180px 1fr 140px 140px', gap: '0', background: '#0d1020', borderBottom: '1px solid #1e2540', padding: '10px 20px' }}>
            <SortableHeader label="우선순위" field="riskLevel" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
            <SortableHeader label="발생 시각" field="detectedAt" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
            <SortableHeader label="위치" field="location" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
            <SortableHeader label="반복 감지" field="repeatDetection" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
            <SortableHeader label="상태" field="status" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
          </div>

          {/* Table Rows */}
          <div>
            {filteredEvents.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
                검색 결과가 없습니다.
              </div>
            ) : (
              filteredEvents.map((event, idx) => (
                <EventRow
                  key={event.id}
                  event={event}
                  isEven={idx % 2 === 0}
                  onClick={() => navigate(`/event/${event.id}`)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({
  label, value, icon, accent, sublabel, pulse, filter, activeFilter, onClick
}: {
  label: string; value: number; icon: React.ReactNode;
  accent: string; sublabel: string; pulse?: boolean;
  filter: FilterChip; activeFilter: FilterChip; onClick: () => void;
}) {
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
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.background = '#151825';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = '#111422';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isActive ? '3px' : '2px', background: accent }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: `${accent}18`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        {pulse && (
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444', animation: 'pulse 2s infinite' }} />
        )}
      </div>
      <div style={{ color: '#e2e8f0', fontSize: '32px', fontWeight: 700, lineHeight: 1, marginBottom: '6px' }}>{value}</div>
      <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{label}</div>
      <div style={{ color: '#475569', fontSize: '11px' }}>{sublabel}</div>
    </div>
  );
}

function EventRow({ event, isEven, onClick }: { event: RoadkillEvent; isEven: boolean; onClick: () => void }) {
  const risk = RISK_CONFIG[event.riskLevel];
  const status = STATUS_CONFIG[event.status];

  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '150px 180px 1fr 140px 140px',
        gap: '0',
        padding: '14px 20px',
        borderBottom: '1px solid #161929',
        background: isEven ? '#111422' : '#0f1220',
        cursor: 'pointer',
        transition: 'background 0.15s',
        alignItems: 'center',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#161c30')}
      onMouseLeave={e => (e.currentTarget.style.background = isEven ? '#111422' : '#0f1220')}
    >
      {/* Priority Badge */}
      <div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '3px 8px', borderRadius: '4px',
          background: risk.bg, border: `1px solid ${risk.border}`,
          color: risk.color, fontSize: '11px', fontWeight: 700,
        }}>
          {risk.icon}
          {event.riskLevel}
        </span>
      </div>

      {/* Time */}
      <div style={{ color: '#94a3b8', fontSize: '12px' }}>{event.detectedAt}</div>

      {/* Location */}
      <div style={{ color: '#cbd5e1', fontSize: '13px', paddingRight: '16px' }}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.location}</div>
        <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{event.cameraId}</div>
      </div>

      {/* Repeat Detection */}
      <div>
        <span style={{
          display: 'inline-block',
          padding: '2px 8px', borderRadius: '4px',
          background: event.repeatDetection ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
          border: `1px solid ${event.repeatDetection ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
          color: event.repeatDetection ? '#ef4444' : '#22c55e',
          fontSize: '11px',
          fontWeight: 600,
        }}>
          {event.repeatDetection ? '반복 감지' : '최초 감지'}
        </span>
      </div>

      {/* Status */}
      <div>
        <span style={{
          display: 'inline-block',
          padding: '3px 8px', borderRadius: '4px',
          background: status.bg,
          color: status.color, fontSize: '11px', fontWeight: 600,
        }}>
          {status.label}
        </span>
      </div>
    </div>
  );
}

function SortableHeader({
  label, field, sortField, sortDirection, onSort
}: {
  label: string;
  field: SortField;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}) {
  const isActive = sortField === field;

  return (
    <button
      onClick={() => onSort(field)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        color: isActive ? '#60a5fa' : '#475569',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#64748b'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#475569'; }}
    >
      {label}
      {isActive && sortDirection === 'asc' && <ArrowUp size={11} />}
      {isActive && sortDirection === 'desc' && <ArrowDown size={11} />}
      {!isActive && <ArrowUpDown size={11} style={{ opacity: 0.3 }} />}
    </button>
  );
}