'use client';
import { useEffect, useState, use } from 'react';
import {
  getAllEventSheetData,
  EventItem,
} from '@/components/custom/EventTemplate/useEventSheetData';
import EventTemplate from '@/components/custom/EventTemplate/EventTemplate';

interface EventPageProps {
  params: Promise<{
    eventName: string;
  }>;
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
        
        // Decode the URL parameter (in case it has special characters)
        const decodedEventName = decodeURIComponent(params.eventName);
        
        // Find the event that matches the URL parameter
        const foundIndex = data.findIndex((event: EventItem) => {
          const eventUrlName = event.url_name.split('/').pop(); // Get just the name part
          return eventUrlName === decodedEventName;
        });

        if (foundIndex === -1) {
          setNotFound(true);
        } else {
          setEventIdx(foundIndex);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.eventName]);

  if (loading) {
    return (
      <div className="full-screen-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (notFound || eventIdx === null) {
    return (
      <div className="body" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Event Not Found</h1>
          <p>The event you're looking for doesn't exist or has been removed.</p>
          <a href="/events" className="btn btn-primary">Back to Events</a>
        </div>
      </div>
    );
  }

  return <EventTemplate eventIdx={eventIdx} />;
}
