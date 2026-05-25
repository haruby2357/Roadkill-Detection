import { useMemo, useState } from 'react';
import { RISK_ORDER, STATUS_ORDER } from '../constants/eventDisplay';
import type { EventStatus, RiskLevel, RoadkillEvent } from '../types/events';

export type SortField = 'riskLevel' | 'detectedAt' | 'location' | 'repeatDetection' | 'status';
export type SortDirection = 'asc' | 'desc' | null;
export type FilterChip = '전체' | RiskLevel | '미확인' | '처리 중' | '처리 완료';

export function useEventFilters(events: RoadkillEvent[]) {
  const [activeFilter, setActiveFilter] = useState<FilterChip>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const totalCount = events.length;
  const unconfirmedCount = events.filter(event => event.status === '미확인').length;
  const immediateCount = events.filter(event => event.riskLevel === '즉시 확인').length;
  const processingCount = events.filter(event => event.status === '확인 중' || event.status === '출동 요청' || event.status === '출동 중').length;
  const completedCount = events.filter(event => event.status === '처리 완료' || event.status === '오탐 처리').length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredEvents = useMemo(() => {
    let nextEvents = [...events];

    if (activeFilter !== '전체') {
      nextEvents = nextEvents.filter(event => {
        if (activeFilter === '미확인') return event.status === '미확인';
        if (activeFilter === '처리 중') return event.status === '확인 중' || event.status === '출동 요청' || event.status === '출동 중';
        if (activeFilter === '처리 완료') return event.status === '처리 완료' || event.status === '오탐 처리';
        return event.riskLevel === activeFilter;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      nextEvents = nextEvents.filter(event =>
        event.location.toLowerCase().includes(query) ||
        event.objectType.toLowerCase().includes(query)
      );
    }

    if (sortField && sortDirection) {
      nextEvents.sort((a, b) => {
        let aVal: string | number = a[sortField] as string | number;
        let bVal: string | number = b[sortField] as string | number;

        if (sortField === 'riskLevel') {
          aVal = RISK_ORDER[a.riskLevel];
          bVal = RISK_ORDER[b.riskLevel];
        } else if (sortField === 'repeatDetection') {
          aVal = a.repeatDetection ? 1 : 0;
          bVal = b.repeatDetection ? 1 : 0;
        } else if (sortField === 'status') {
          aVal = STATUS_ORDER[a.status as EventStatus];
          bVal = STATUS_ORDER[b.status as EventStatus];
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return nextEvents;
  }, [activeFilter, events, searchQuery, sortDirection, sortField]);

  return {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    handleSort,
    filteredEvents,
    summary: {
      totalCount,
      unconfirmedCount,
      immediateCount,
      processingCount,
      completedCount,
    },
  };
}
