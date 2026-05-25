import { createBrowserRouter } from 'react-router';
import { DashboardPage } from './pages/DashboardPage';
import { EventDetailPage } from './pages/EventDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashboardPage,
  },
  {
    path: '/event/:id',
    Component: EventDetailPage,
  },
  {
    path: '*',
    Component: DashboardPage,
  },
]);
