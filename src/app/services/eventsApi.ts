/// <reference types="vite/client" />

import { mockEvents } from "../data/mockEvents";
import type { EventStatus, RoadkillEvent } from "../types/events";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN as
  | string
  | undefined;

// 기본값은 목업 모드
export const isMockMode =
  (import.meta.env.VITE_USE_MOCKS ?? "true") !== "false" || !API_BASE_URL;

type BackendEventStatus =
  | "UNCHECKED"
  | "CHECKING"
  | "DISPATCH_REQUESTED"
  | "DISPATCHING"
  | "COMPLETED"
  | "MISIDENTIFIED";

export interface EventComment {
  id: string;
  eventId: string;
  content: string;
  createdAt: string;
  writerName?: string;
}

const statusToBackendStatus: Record<EventStatus, BackendEventStatus> = {
  미확인: "UNCHECKED",
  "확인 중": "CHECKING",
  "출동 요청": "DISPATCH_REQUESTED",
  "출동 중": "DISPATCHING",
  "처리 완료": "COMPLETED",
  "오탐 처리": "MISIDENTIFIED",
};

const getBackendOrigin = (): string => {
  if (BACKEND_ORIGIN) {
    return BACKEND_ORIGIN.replace(/\/$/, "");
  }

  if (!API_BASE_URL) {
    return "";
  }

  // 예: http://3.27.181.100:8000/api -> http://3.27.181.100:8000
  return API_BASE_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
};

const resolveImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const backendOrigin = getBackendOrigin();

  // Vercel rewrite를 쓸 때처럼 origin을 비워두는 경우에는 상대경로 그대로 사용
  if (!backendOrigin) {
    return imageUrl;
  }

  // 예: /static/images/a.jpeg -> http://3.27.181.100:8000/static/images/a.jpeg
  return `${backendOrigin}${imageUrl}`;
};

const normalizeEvent = (event: RoadkillEvent): RoadkillEvent => {
  return {
    ...event,
    imageUrl: resolveImageUrl(event.imageUrl),
  };
};

const getMockCommentStorageKey = (eventId: string): string => {
  return `roadkill-event-comments:${eventId}`;
};

const getMockComments = (eventId: string): EventComment[] => {
  if (typeof window === "undefined") return [];

  const rawComments = window.localStorage.getItem(
    getMockCommentStorageKey(eventId),
  );

  if (!rawComments) return [];

  try {
    return JSON.parse(rawComments) as EventComment[];
  } catch {
    return [];
  }
};

const saveMockComments = (eventId: string, comments: EventComment[]): void => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getMockCommentStorageKey(eventId),
    JSON.stringify(comments),
  );
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL이 설정되지 않았습니다.");
  }

  const headers = new Headers(options?.headers);

  if (options?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `API 요청 실패: ${response.status} ${response.statusText} ${errorText}`,
    );
  }

  return response.json() as Promise<T>;
}

export const eventsApi = {
  async getEvents(): Promise<RoadkillEvent[]> {
    if (isMockMode) return mockEvents;

    const events = await request<RoadkillEvent[]>("/events");

    return events.map(normalizeEvent);
  },

  async getEventById(id: string): Promise<RoadkillEvent> {
    if (isMockMode) {
      const event = mockEvents.find((item) => item.id === id);
      if (!event) throw new Error("이벤트를 찾을 수 없습니다.");

      return event;
    }

    const event = await request<RoadkillEvent>(`/events/${id}`);

    return normalizeEvent(event);
  },

  async updateEventStatus(
    id: string,
    status: EventStatus,
    memo?: string,
  ): Promise<RoadkillEvent> {
    if (isMockMode) {
      const event = mockEvents.find((item) => item.id === id);
      if (!event) throw new Error("이벤트를 찾을 수 없습니다.");

      return {
        ...event,
        status,
      };
    }

    const updatedEvent = await request<RoadkillEvent>(`/events/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({
        status: statusToBackendStatus[status],
        comment: memo?.trim() || undefined,
      }),
    });

    return normalizeEvent(updatedEvent);
  },

  async getEventComments(eventId: string): Promise<EventComment[]> {
    if (isMockMode) {
      return getMockComments(eventId);
    }

    return request<EventComment[]>(`/events/${eventId}/comments`);
  },

  async createEventComment(
    eventId: string,
    content: string,
  ): Promise<EventComment> {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      throw new Error("처리 메모 내용을 입력해주세요.");
    }

    if (isMockMode) {
      const newComment: EventComment = {
        id: crypto.randomUUID(),
        eventId,
        content: trimmedContent,
        createdAt: new Date().toISOString(),
        writerName: "관제사",
      };

      const comments = getMockComments(eventId);
      const nextComments = [newComment, ...comments];

      saveMockComments(eventId, nextComments);

      return newComment;
    }

    return request<EventComment>(`/events/${eventId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: trimmedContent,
      }),
    });
  },
};
