'use client';
import Link from 'next/link';
import { EventItem, formatDate } from '@/lib/events';

interface Props {
  upcoming: EventItem[];
  past: EventItem[];
}

export default function EventsClient({ upcoming, past }: Props) {
  return (
    <>
      {/* Upcoming */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center mb-10">Upcoming Events</h2>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {upcoming.map(({ time, name, banner_img_path, url_name }) => (
                <Link key={name} href={url_name}
                  className="group block rounded-2xl overflow-hidden bg-white shadow-subtle border border-line hover:translate-y-[-6px] hover:shadow-hover transition-all no-underline">
                  <div className="relative h-[200px] bg-navy bg-cover bg-center" style={{ backgroundImage: `url("${banner_img_path}")` }}>
                    <div className="absolute inset-0 bg-gold/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-arrow-right text-white text-2xl" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[1.15rem] mb-1.5">{name}</h3>
                    <p className="text-txt-muted text-sm">{time}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-txt-muted">
              <i className="fas fa-calendar-xmark text-4xl mb-4 block opacity-40" />
              <p className="text-[1.05rem]">No upcoming events. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="py-20 bg-surface-light">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-center mb-10">Past Events</h2>
            <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
              {past.map(({ name, date, banner_img_path, short_desc, url_name }) => (
                <Link key={name} href={url_name}
                  className="flex gap-5 p-4 bg-white rounded-lg border border-line no-underline hover:shadow-card hover:translate-x-1 transition-all items-center max-sm:flex-col max-sm:items-start">
                  <div className="w-[100px] h-[80px] rounded-md overflow-hidden shrink-0 max-sm:w-full max-sm:h-[160px]">
                    <img src={banner_img_path} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-3.5 py-1 bg-surface-subtle text-brand-cyan rounded-full text-[0.78rem] font-semibold font-heading mb-1.5">{formatDate(date)}</span>
                    <h4 className="text-[1.05rem] mb-1 truncate max-sm:whitespace-normal">{name}</h4>
                    <p className="text-txt-muted text-[0.88rem] leading-snug line-clamp-2">
                      {short_desc ? (short_desc.substring(0, short_desc.indexOf('.') + 1) || short_desc.substring(0, 120) + '...') : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
