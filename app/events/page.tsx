import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { getAllEventData } from '@/lib/events';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Workshops, panels, networking sessions, and collaborative challenges from ML@UVA.',
};

export default async function EventsPage() {
  const data = await getAllEventData();
  const upcoming = data.filter((e) => !e.complete);
  const past = [...data.filter((e) => e.complete)].reverse();

  return (
    <div>
      <PageHero title="Events" subtitle="Workshops, panels, networking sessions, and collaborative challenges throughout the semester." />
      <EventsClient upcoming={upcoming} past={past} />
    </div>
  );
}
