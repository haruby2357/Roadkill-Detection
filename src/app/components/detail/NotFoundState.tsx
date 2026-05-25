import { AlertCircle } from 'lucide-react';

interface NotFoundStateProps {
  onBack: () => void;
}

export function NotFoundState({ onBack }: NotFoundStateProps) {
  return (
    <div style={{ background: '#0b0e1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#94a3b8', textAlign: 'center' }}>
        <AlertCircle size={48} color="#475569" />
        <p style={{ marginTop: '16px', fontSize: '16px' }}>이벤트를 찾을 수 없습니다.</p>
        <button onClick={onBack} style={{ marginTop: '12px', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>← 대시보드로 돌아가기</button>
      </div>
    </div>
  );
}
