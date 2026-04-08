'use client';
import { useEffect, useState, use } from 'react';
import { getAllEventSheetData, EventItem } from '@/components/custom/EventTemplate/useEventSheetData';
import EventTemplate from '@/components/custom/EventTemplate/EventTemplate';
import Link from 'next/link';

interface EventPageProps {
  params: Promise<{ eventName: string }>;
}

export default function EventPage({ params: paramsPromise }: EventPageProps) {
  const params = use(paramsPromise);
  const [eventIdx, setEventIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEventSheetData();
        const decoded = decodeURIComponent(params.eventName);
        const idx = data.findIndex((e: EventItem) => e.url_name.split('/').pop() === decoded);
        if (idx === -1) setNotFound(true);
        else setEventIdx(idx);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.eventName]);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-12 h-12 rounded-full border-[3px] border-line border-t-brand-cyan animate-spin" /></div>;

  if (notFound || eventIdx === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-center pt-32 pb-16 px-6">
        <div>
          <h1 className="mb-3">Event Not Found</h1>
          <p className="text-txt-secondary mb-6">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/events" className="inline-flex items-center gap-2 px-7 py-3 bg-brand-cyan text-white font-heading font-semibold text-sm rounded-md hover:bg-navy transition-all no-underline">
            <i className="fas fa-arrow-left" /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return <EventTemplate eventIdx={eventIdx} />;
}
