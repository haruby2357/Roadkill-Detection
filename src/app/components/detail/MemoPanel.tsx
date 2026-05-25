import { CheckCircle2, FileText, Shield } from 'lucide-react';

interface MemoPanelProps {
  memo: string;
  savedConfirm: boolean;
  onMemoChange: (value: string) => void;
  onSave: () => void;
}

export function MemoPanel({ memo, savedConfirm, onMemoChange, onSave }: MemoPanelProps) {
  return (
    <div style={{ background: '#111422', border: '1px solid #1e2540', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileText size={14} color="#64748b" />
        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>처리 메모</span>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <textarea
          value={memo}
          onChange={event => onMemoChange(event.target.value)}
          placeholder="처리 메모를 입력하세요..."
          rows={4}
          style={{ width: '100%', background: '#0d1020', border: '1px solid #1e2540', borderRadius: '8px', padding: '10px 12px', color: '#cbd5e1', fontSize: '13px', resize: 'none', outline: 'none', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", lineHeight: 1.6, boxSizing: 'border-box' }}
        />
        <button onClick={onSave} style={{ width: '100%', padding: '11px', borderRadius: '8px', background: savedConfirm ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)', border: `1px solid ${savedConfirm ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'}`, color: savedConfirm ? '#22c55e' : '#60a5fa', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', transition: 'all 0.2s' }}>
          {savedConfirm ? <><CheckCircle2 size={14} />저장 완료</> : <><Shield size={14} />상태 저장</>}
        </button>

        {savedConfirm && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={13} color="#22c55e" />
            <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 600 }}>상태가 성공적으로 저장되었습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
