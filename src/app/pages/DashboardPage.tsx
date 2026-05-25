import { useNavigate } from 'react-router';
import { DashboardHeader } from '../components/layout/DashboardHeader';
import { DashboardFilters } from '../components/dashboard/DashboardFilters';
import { DashboardSummary } from '../components/dashboard/DashboardSummary';
import { EventTable } from '../components/dashboard/EventTable';
import { useEvents } from '../contexts/EventsContext';
import { useEventFilters } from '../hooks/useEventFilters';

export function DashboardPage() {
  const navigate = useNavigate();
  const { events, errorMessage, refreshEvents } = useEvents();
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    handleSort,
    filteredEvents,
    summary,
  } = useEventFilters(events);

  return (
    <div style={{ background: '#0b0e1a', minHeight: '100vh', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      <DashboardHeader />
      <main style={{ padding: '28px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        {errorMessage && (
          <div style={{ marginBottom: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px' }}>
            {errorMessage}
          </div>
        )}
        <DashboardSummary summary={summary} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <DashboardFilters activeFilter={activeFilter} searchQuery={searchQuery} onFilterChange={setActiveFilter} onSearchChange={setSearchQuery} />
        <EventTable
          events={filteredEvents}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRefresh={() => void refreshEvents()}
          onRowClick={eventId => navigate(`/event/${eventId}`)}
        />
      </main>
    </div>
  );
}
