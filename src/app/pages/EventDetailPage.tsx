import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DetailHeader } from '../components/detail/DetailHeader';
import { DetectionImageCard } from '../components/detail/DetectionImageCard';
import { EventInfoCard } from '../components/detail/EventInfoCard';
import { MemoPanel } from '../components/detail/MemoPanel';
import { NotFoundState } from '../components/detail/NotFoundState';
import { RiskReasonCard } from '../components/detail/RiskReasonCard';
import { StatusActionPanel } from '../components/detail/StatusActionPanel';
import { StatusTimeline } from '../components/detail/StatusTimeline';
import { useEvents } from '../contexts/EventsContext';
import type { EventStatus } from '../types/events';

export function EventDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { events, updateEventStatus, errorMessage } = useEvents();
  const [memo, setMemo] = useState('');
  const [savedConfirm, setSavedConfirm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | null>(null);

  const event = events.find(item => item.id === id);

  if (!event) {
    return <NotFoundState onBack={() => navigate('/')} />;
  }

  const currentStatus = selectedStatus ?? event.status;

  const handleSave = async () => {
    if (selectedStatus) {
      await updateEventStatus(event.id, selectedStatus, memo);
      setSelectedStatus(null);
    }

    setSavedConfirm(true);
    window.setTimeout(() => setSavedConfirm(false), 3000);
  };

  return (
    <div style={{ background: '#0b0e1a', minHeight: '100vh', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      <DetailHeader event={event} currentStatus={currentStatus} onBack={() => navigate('/')} />
      <main style={{ padding: '28px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        {errorMessage && (
          <div style={{ marginBottom: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px' }}>
            {errorMessage}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DetectionImageCard event={event} />
            <EventInfoCard event={event} currentStatus={currentStatus} />
            <RiskReasonCard event={event} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px' }}>
            <StatusTimeline currentStatus={currentStatus} />
            <StatusActionPanel currentStatus={currentStatus} onSelectStatus={setSelectedStatus} />
            <MemoPanel memo={memo} savedConfirm={savedConfirm} onMemoChange={setMemo} onSave={() => void handleSave()} />
          </div>
        </div>
      </main>
    </div>
  );
}
