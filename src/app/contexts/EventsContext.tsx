import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { mockEvents } from '../data/mockEvents';
import { eventsApi, isMockMode } from '../services/eventsApi';
import type { EventStatus, RoadkillEvent } from '../types/events';

interface EventsContextType {
  events: RoadkillEvent[];
  isLoading: boolean;
  errorMessage: string | null;
  refreshEvents: () => Promise<void>;
  updateEventStatus: (id: string, status: EventStatus, memo?: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<RoadkillEvent[]>(isMockMode ? mockEvents : []);
  const [isLoading, setIsLoading] = useState(!isMockMode);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshEvents = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const nextEvents = await eventsApi.getEvents();
      setEvents(nextEvents);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '이벤트 목록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateEventStatus = async (id: string, status: EventStatus, memo?: string) => {
    const previousEvents = events;

    // 사용자가 저장 버튼을 눌렀을 때 즉시 화면에 반영되도록 낙관적 업데이트를 적용합니다.
    setEvents(prevEvents => prevEvents.map(event => (event.id === id ? { ...event, status } : event)));

    try {
      const updatedEvent = await eventsApi.updateEventStatus(id, status, memo);
      setEvents(prevEvents => prevEvents.map(event => (event.id === id ? updatedEvent : event)));
      setErrorMessage(null);
    } catch (error) {
      setEvents(previousEvents);
      setErrorMessage(error instanceof Error ? error.message : '이벤트 상태 저장에 실패했습니다.');
      throw error;
    }
  };

  useEffect(() => {
    void refreshEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, isLoading, errorMessage, refreshEvents, updateEventStatus }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
