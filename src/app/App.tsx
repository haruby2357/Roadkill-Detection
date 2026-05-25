import { RouterProvider } from 'react-router';
import { router } from './routes';
import { EventsProvider } from './contexts/EventsContext';

export default function App() {
  return (
    <EventsProvider>
      <RouterProvider router={router} />
    </EventsProvider>
  );
}
