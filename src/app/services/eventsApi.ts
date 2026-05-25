/// <reference types="vite/client" />

import { mockEvents } from "../data/mockEvents";
import type { EventStatus, RoadkillEvent } from "../types/events";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

// 기본값은 목업 모드입니다. 백엔드가 준비되면 .env에서 VITE_USE_MOCKS=false로 바꿉니다.
export const isMockMode =
  (import.meta.env.VITE_USE_MOCKS ?? "true") !== "false" || !API_BASE_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL이 설정되지 않았습니다.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const eventsApi = {
  async getEvents(): Promise<RoadkillEvent[]> {
    if (isMockMode) return mockEvents;
    return request<RoadkillEvent[]>("/events");
  },

  async updateEventStatus(
    id: string,
    status: EventStatus,
    memo?: string,
  ): Promise<RoadkillEvent> {
    if (isMockMode) {
      const event = mockEvents.find((item) => item.id === id);
      if (!event) throw new Error("이벤트를 찾을 수 없습니다.");
      return { ...event, status };
    }

    return request<RoadkillEvent>(`/events/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, memo }),
    });
  },
};
