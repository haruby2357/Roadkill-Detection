import { Activity, RefreshCw } from "lucide-react";
import type { SortDirection, SortField } from "../../hooks/useEventFilters";
import type { RoadkillEvent } from "../../types/events";
import { EventRow } from "./EventRow";
import { SortableHeader } from "./SortableHeader";

interface EventTableProps {
  events: RoadkillEvent[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onRefresh: () => void;
  onRowClick: (eventId: string) => void;
}

export function EventTable({
  events,
  sortField,
  sortDirection,
  onSort,
  onRefresh,
  onRowClick,
}: EventTableProps) {
  const gridCols =
    "minmax(100px, 0.8fr) minmax(120px, 0.9fr) minmax(150px, 2fr) minmax(110px, 0.8fr) minmax(110px, 0.8fr)";

  return (
    <div
      style={{
        background: "#111422",
        border: "1px solid #1e2540",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #1e2540",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Activity size={15} color="#3b82f6" />
          <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>
            이벤트 목록
          </span>
          <span
            style={{
              background: "rgba(59,130,246,0.15)",
              color: "#60a5fa",
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "10px",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            {events.length}건
          </span>
        </div>
        <button
          onClick={onRefresh}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#64748b",
            fontSize: "12px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={12} />
          새로고침
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: "0",
          background: "#0d1020",
          borderBottom: "1px solid #1e2540",
          padding: "10px 20px",
          fontSize: "12px",
        }}
      >
        <SortableHeader
          label="우선순위"
          field="riskLevel"
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <SortableHeader
          label="발생 시각"
          field="detectedAt"
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <SortableHeader
          label="위치"
          field="location"
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <SortableHeader
          label="반복 감지"
          field="repeatDetection"
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <SortableHeader
          label="상태"
          field="status"
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
      </div>

      <div style={{ overflowY: "auto", maxHeight: "500px" }}>
        {events.length === 0 ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#475569",
              fontSize: "14px",
            }}
          >
            검색 결과가 없습니다.
          </div>
        ) : (
          events.map((event, index) => (
            <EventRow
              key={event.id}
              event={event}
              isEven={index % 2 === 0}
              onClick={() => onRowClick(event.id)}
              gridCols={gridCols}
            />
          ))
        )}
      </div>
    </div>
  );
}
