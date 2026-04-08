'use client';
import { useState } from 'react';
import { useEventSheetData, formatDate } from './useEventSheetData';

export default function EventTemplate({ eventIdx }: { eventIdx: number }) {
  const { eventItem, loading, linkList, longDescList, imgPathList, mapUrl } = useEventSheetData(eventIdx);
  const [activeImg, setActiveImg] = useState(0);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-12 h-12 rounded-full border-[3px] border-line border-t-brand-cyan animate-spin" /></div>;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-end justify-center pt-24 pb-16 px-6 text-center overflow-hidden">
        <img src={eventItem.banner_img_path || '/img/sigai-header-banner.jpeg'} alt={eventItem.name}
          className="absolute inset-0 w-full h-full object-cover blur-[8px] scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-navy/85" />
        <div className="relative z-10">
          <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] mb-4">{eventItem.name}</h1>
          <div className="flex justify-center gap-6 text-white/80 text-[1.05rem] mb-6 flex-wrap">
            <span><i className="fas fa-calendar text-gold mr-1.5" /> {formatDate(eventItem.date)}</span>
            <span><i className="fas fa-clock text-gold mr-1.5" /> {eventItem.time}</span>
          </div>
          {linkList.length > 0 && (
            <a href={linkList[0].link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-brand-cyan text-white font-heading font-semibold text-sm rounded-md hover:bg-white hover:text-navy transition-all no-underline">
              {linkList[0].name} <i className="fas fa-arrow-right" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {imgPathList.length > 0 && (
              <div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                  {imgPathList.map((src, idx) => (
                    <img key={idx} src={src} alt={`${eventItem.name} photo ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${idx === activeImg ? 'opacity-100' : 'opacity-0'}`}
                      referrerPolicy="no-referrer" />
                  ))}
                </div>
                {imgPathList.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3.5">
                    {imgPathList.map((_, idx) => (
                      <button key={idx} onClick={() => setActiveImg(idx)} aria-label={`Photo ${idx + 1}`}
                        className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all ${idx === activeImg ? 'bg-brand-cyan scale-125' : 'bg-line'}`} />
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              {eventItem.header1 && <h2 className="mb-4">{eventItem.header1}</h2>}
              <p className="text-txt-secondary leading-relaxed text-[1.02rem]">{eventItem.short_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Long Desc */}
      {longDescList.length > 0 && (
        <section className="py-20 bg-surface-light">
          <div className="max-w-[1200px] mx-auto px-6">
            {eventItem.header2 && <h2 className="text-center mb-10">{eventItem.header2}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {longDescList.map(({ header, content }, i) => (
                <div key={i} className="bg-white border border-line border-l-4 border-l-brand-cyan rounded-2xl p-8">
                  <h4 className="mb-3">{header}</h4>
                  <p className="text-txt-secondary leading-relaxed">{content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Links */}
      {linkList.length > 1 && (
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6 text-center flex gap-3.5 justify-center flex-wrap">
            {linkList.map(({ name, link }, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-brand-cyan text-brand-cyan font-heading font-semibold text-sm rounded-md hover:bg-brand-cyan hover:text-white transition-all no-underline">
                {name} <i className="fas fa-arrow-right" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Location */}
      <section className="py-20 bg-surface-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              {eventItem.google_maps_link && mapUrl ? (
                <iframe width="100%" height="300" src={mapUrl} className="border-none rounded-lg shadow-card" loading="lazy" />
              ) : (
                <div className="w-full h-[300px] bg-surface-subtle rounded-lg flex items-center justify-center text-4xl text-txt-muted">
                  <i className="fas fa-map-marker-alt" />
                </div>
              )}
            </div>
            <div>
              <h3 className="mb-2">Location &amp; Time</h3>
              <p className="text-txt-secondary mb-1">{eventItem.location_long || eventItem.location}</p>
              <p className="text-txt-secondary">{eventItem.time}</p>
              <hr className="my-5 border-line" />
              <h3 className="mb-2">Questions?</h3>
              <p className="text-txt-secondary">Contact us at <a href="mailto:contact-ml@virginia.edu" className="text-brand-cyan hover:text-navy transition-colors">contact-ml@virginia.edu</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
