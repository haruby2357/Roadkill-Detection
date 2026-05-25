import { RISK_DISPLAY, STATUS_DISPLAY } from "../../constants/eventDisplay";
import type { RoadkillEvent } from "../../types/events";

interface EventRowProps {
  event: RoadkillEvent;
  isEven: boolean;
  onClick: () => void;
  gridCols?: string;
}

export function EventRow({
  event,
  isEven,
  onClick,
  gridCols = "minmax(100px, 0.8fr) minmax(120px, 0.9fr) minmax(150px, 2fr) minmax(110px, 0.8fr) minmax(110px, 0.8fr)",
}: EventRowProps) {
  const risk = RISK_DISPLAY[event.riskLevel];
  const status = STATUS_DISPLAY[event.status];

  return (
    <div
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        gap: "0",
        padding: "14px 20px",
        borderBottom: "1px solid #161929",
        background: isEven ? "#111422" : "#0f1220",
        cursor: "pointer",
        transition: "background 0.15s",
        alignItems: "center",
      }}
      onMouseEnter={(event) =>
        (event.currentTarget.style.background = "#161c30")
      }
      onMouseLeave={(mouseEvent) =>
        (mouseEvent.currentTarget.style.background = isEven
          ? "#111422"
          : "#0f1220")
      }
    >
      <div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "3px 8px",
            borderRadius: "4px",
            background: risk.bg,
            border: `1px solid ${risk.border}`,
            color: risk.color,
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          {risk.icon}
          {event.riskLevel}
        </span>
      </div>

      <div style={{ color: "#94a3b8", fontSize: "12px" }}>
        {event.detectedAt}
      </div>

      <div style={{ color: "#cbd5e1", fontSize: "13px", paddingRight: "16px" }}>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {event.location}
        </div>
        <div style={{ color: "#475569", fontSize: "11px", marginTop: "2px" }}>
          {event.cameraId}
        </div>
      </div>

      <div>
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: "4px",
            background: event.repeatDetection
              ? "rgba(239,68,68,0.12)"
              : "rgba(34,197,94,0.12)",
            border: `1px solid ${event.repeatDetection ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
            color: event.repeatDetection ? "#ef4444" : "#22c55e",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {event.repeatDetection ? "반복 감지" : "최초 감지"}
        </span>
      </div>

      <div>
        <span
          style={{
            display: "inline-block",
            padding: "3px 8px",
            borderRadius: "4px",
            background: status.bg,
            color: status.color,
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}
