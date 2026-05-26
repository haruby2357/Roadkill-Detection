import { CheckCircle2, FileText, Shield } from "lucide-react";
import type { EventComment } from "../../services/eventsApi";

interface MemoPanelProps {
  memo: string;
  comments: EventComment[];
  savedConfirm: boolean;
  isSaving: boolean;
  onMemoChange: (value: string) => void;
  onSave: () => void;
}

const formatCommentTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function MemoPanel({
  memo,
  comments,
  savedConfirm,
  isSaving,
  onMemoChange,
  onSave,
}: MemoPanelProps) {
  return (
    <div
      style={{
        background: "#111422",
        border: "1px solid #1e2540",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid #1e2540",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FileText size={14} color="#64748b" />
        <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 600 }}>
          처리 메모
        </span>
      </div>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <textarea
          value={memo}
          onChange={(event) => onMemoChange(event.target.value)}
          placeholder="처리 메모를 입력하세요..."
          rows={4}
          style={{
            width: "100%",
            background: "#0d1020",
            border: "1px solid #1e2540",
            borderRadius: "8px",
            padding: "10px 12px",
            color: "#cbd5e1",
            fontSize: "13px",
            resize: "none",
            outline: "none",
            fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
            lineHeight: 1.6,
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={onSave}
          disabled={isSaving}
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: "8px",
            background: savedConfirm
              ? "rgba(34,197,94,0.15)"
              : "rgba(59,130,246,0.15)",
            border: `1px solid ${savedConfirm ? "rgba(34,197,94,0.3)" : "rgba(59,130,246,0.3)"}`,
            color: savedConfirm ? "#22c55e" : "#60a5fa",
            fontSize: "13px",
            fontWeight: 700,
            cursor: isSaving ? "not-allowed" : "pointer",
            opacity: isSaving ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            transition: "all 0.2s",
          }}
        >
          {savedConfirm ? (
            <>
              <CheckCircle2 size={14} />
              저장 완료
            </>
          ) : (
            <>
              <Shield size={14} />
              {isSaving ? "저장 중..." : "메모 저장"}
            </>
          )}
        </button>

        {savedConfirm && (
          <div
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "8px",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle2 size={13} color="#22c55e" />
            <span
              style={{ color: "#22c55e", fontSize: "12px", fontWeight: 600 }}
            >
              처리 메모가 성공적으로 저장되었습니다.
            </span>
          </div>
        )}

        <div
          style={{
            borderTop: "1px solid #1e2540",
            paddingTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 700 }}>
            저장된 메모
          </div>

          {comments.length === 0 ? (
            <div
              style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.5 }}
            >
              아직 저장된 처리 메모가 없습니다.
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  background: "#0d1020",
                  border: "1px solid #1e2540",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {comment.writerName ?? "관제사"}
                  </span>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>
                    {formatCommentTime(comment.createdAt)}
                  </span>
                </div>
                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "12px",
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                  }}
                >
                  {comment.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
