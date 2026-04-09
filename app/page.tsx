'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InteractiveBackground from '@/components/InteractiveBackground';
import Icon from '@/components/Icon';
import Calendar from '@/components/custom/Calendar/Calendar';
import { SITE_LINKS } from '@/lib/constants';

const photos = [
  '/home/lecture1.jpeg',
  '/home/aieverywhere.jpeg',
  '/home/emmatalha.jpg',
  '/home/linklab.jpg',
  '/home/speaking-panelists.jpg',
];

const pillars = [
  { title: 'Education', desc: 'Weekly lectures, reading groups, and workshops covering ML fundamentals to cutting-edge research papers. All levels welcome.', link: '/education' },
  { title: 'Research', desc: 'Collaborate on original research across ML subfields. We provide resources, mentorship, and real project experience.', link: '/research' },
  { title: 'Partnerships', desc: 'Bridge academia and industry through consulting engagements, speaker events, and strategic collaborations.', link: '/partnerships' },
];

export default function HomePage() {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActivePhoto((p) => (p + 1) % photos.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f5f7ff 50%, #fafbff 100%)' }}>
        <InteractiveBackground />
        <div className="relative z-[3] max-w-[1200px] mx-auto px-6 w-full pt-28 pb-20">
          <p className="text-txt-muted text-[0.65rem] tracking-[0.35em] uppercase font-body mb-10">
            Machine Learning · University of Virginia
          </p>
          <h1 className="font-heading font-extrabold tracking-tight leading-[0.92] text-[clamp(3.25rem,8vw,6rem)] mb-8 max-w-[700px]">
            <span className="text-orange">Machine</span><br />
            <span className="text-orange">Learning</span><br />
            <span className="text-txt">at </span><span className="text-uva-blue">UVA.</span>
          </h1>
          <p className="text-txt-secondary text-[1.05rem] max-w-[440px] mb-12 leading-relaxed font-body">
            The comprehensive ML and AI organization at UVA — 200+ members, weekly workshops,
            research projects, and industry partnerships.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={SITE_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-txt text-white font-heading font-semibold text-sm rounded-full hover:bg-navy hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 no-underline"
            >
              <Icon name="discord" className="w-3.5 h-3.5" /> Join on Discord
            </a>
            <Link
              href="/about"
              className="text-txt-muted text-sm font-body hover:text-txt transition-colors duration-200 no-underline inline-flex items-center gap-1.5"
            >
              Learn about us <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section className="py-28 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-20 items-start">

            {/* Text */}
            <div>
              <p className="text-orange text-[0.65rem] tracking-[0.25em] uppercase font-semibold font-body mb-6">
                About
              </p>
              <h2 className="font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight mb-7">
                Building ML<br />at UVA.
              </h2>
              <p className="text-txt-secondary leading-relaxed mb-4">
                We are the comprehensive machine learning and AI organization at UVA with{' '}
                <strong className="text-txt font-semibold">200+ members</strong>. We strive to make
                ML accessible for everyone, regardless of prior background.
              </p>
              <p className="text-txt-secondary leading-relaxed mb-10">
                Whether you&apos;re a seasoned ML specialist or just starting out, ML@UVA provides
                the resources, mentorship, and community to help you grow.
              </p>
              <p className="text-txt-muted text-sm italic mb-10">
                Formerly SIGAI (Special Interest Group on Artificial Intelligence) under ACM
              </p>
              <Link
                href="/about"
                className="text-txt font-heading font-semibold text-sm inline-flex items-center gap-2 hover:text-navy transition-colors duration-200 no-underline"
              >
                Our story <span className="text-base leading-none">→</span>
              </Link>
            </div>

            {/* Gallery */}
            <div>
              <div
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setActivePhoto((activePhoto + 1) % photos.length)}
              >
                {photos.map((photo, idx) => (
                  <Image
                    key={photo}
                    src={photo}
                    alt="ML@UVA community"
                    fill
                    className={`object-cover transition-opacity duration-700 ${idx === activePhoto ? 'opacity-100' : 'opacity-0'}`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={idx === 0}
                  />
                ))}
              </div>
              <div className="flex gap-2 mt-4 items-center">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    aria-label={`Photo ${idx + 1}`}
                    className={`h-[2px] rounded-full border-none cursor-pointer transition-all duration-300 ${
                      idx === activePhoto ? 'w-8 bg-navy opacity-100' : 'w-3 bg-line opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────────── */}
      <section className="py-28 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <h2 className="font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight max-w-[420px]">
              Three pillars,<br />one community.
            </h2>
            <p className="text-txt-muted text-sm max-w-[280px] leading-relaxed md:text-right">
              Built to make ML accessible, impactful, and exciting for every student at UVA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-line divide-y md:divide-y-0">
            {pillars.map(({ title, desc, link }, i) => (
              <Link
                key={title}
                href={link}
                className="group no-underline py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0"
              >
                <span className="text-[3rem] font-heading font-black leading-none text-line block mb-5 group-hover:text-orange/30 transition-colors duration-300">
                  0{i + 1}
                </span>
                <h3 className="text-[1.2rem] font-heading font-bold mb-3 group-hover:text-orange transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-txt-secondary text-sm leading-relaxed mb-6">{desc}</p>
                <span className="text-txt-muted text-[0.7rem] tracking-[0.2em] uppercase font-semibold group-hover:text-orange transition-colors duration-200">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendar ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-txt-muted text-[0.65rem] tracking-[0.25em] uppercase font-semibold mb-6">
            Schedule
          </p>
          <h2 className="font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight mb-12">
            Upcoming events.
          </h2>
          <Calendar />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-ink">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div>
              <p className="text-white/25 text-[0.65rem] tracking-[0.3em] uppercase font-body mb-5">
                Get involved
              </p>
              <h2 className="text-white font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight max-w-[420px]">
                Join the community.
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-white/35 text-sm leading-relaxed max-w-[320px]">
                Meetings every Wednesday &amp; Monday in Olsson Hall.
                Join our Discord for exact times and room numbers.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href={SITE_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-ink font-heading font-semibold text-sm rounded-full hover:bg-navy hover:text-white transition-all duration-200 no-underline"
                >
                  <Icon name="discord" className="w-3.5 h-3.5" /> Discord
                </a>
                {SITE_LINKS.registerLink && (
                  <a
                    href={SITE_LINKS.registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/70 font-heading font-semibold text-sm rounded-full hover:border-white/50 hover:text-white transition-all duration-200 no-underline"
                  >
                    Apply →
                  </a>
                )}
                <a
                  href={`mailto:${SITE_LINKS.contactEmail}`}
                  className="text-white/40 text-sm font-body self-center hover:text-white/70 transition-colors no-underline"
                >
                  {SITE_LINKS.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
