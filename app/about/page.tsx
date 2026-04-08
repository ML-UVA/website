import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about ML@UVA — our mission, pillars, and community at the University of Virginia.',
};

const pillars = [
  { title: 'Education', desc: 'Comprehensive learning through lectures, reading groups, and workshops. We meet students where they are and build from there — no prior ML experience required.' },
  { title: 'Research', desc: 'Collaborate on original research in emerging ML subfields. We provide resources, mentorship, and funding to help student-led projects go further.' },
  { title: 'Partnerships', desc: 'Connect top talent with industry leaders and research institutions through consulting engagements, speaker events, and strategic collaborations.' },
];

const photos = [
  { src: '/img/about/1.jpg', alt: 'ML@UVA event' },
  { src: '/img/about/2.jpg', alt: 'ML@UVA workshop' },
  { src: '/img/about/3.jpg', alt: 'ML@UVA members' },
  { src: '/img/about/4.jpg', alt: 'ML@UVA presentation' },
];

export default function About() {
  return (
    <div>
      <PageHero
        title="About ML@UVA"
        subtitle="Building a vibrant machine learning community at the University of Virginia."
      />

      {/* Mission */}
      <section className="py-28 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 items-start">
            <div>
              <p className="text-cyan text-[0.65rem] tracking-[0.25em] uppercase font-semibold font-body mb-3">
                Mission
              </p>
              <h2 className="font-heading font-extrabold text-[2rem] leading-tight tracking-tight">
                Why we exist.
              </h2>
            </div>
            <p className="text-txt-secondary text-[1.1rem] leading-relaxed pt-2 lg:pt-10">
              ML@UVA is a student-run organization dedicated to advancing machine learning education,
              research, and industry collaboration at the University of Virginia. We believe in making
              machine learning accessible to all students while fostering innovation through hands-on
              projects and cutting-edge research. With <strong className="text-txt font-semibold">200+ members</strong>,
              we&apos;re UVA&apos;s largest ML and AI community.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-28 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <h2 className="font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight max-w-[400px]">
              What drives us.
            </h2>
            <p className="text-txt-muted text-sm max-w-[280px] leading-relaxed md:text-right">
              Three programs built around what students actually need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-line divide-y md:divide-y-0">
            {pillars.map(({ title, desc }, i) => (
              <div key={title} className="py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
                <span className="text-[3rem] font-heading font-black leading-none text-line block mb-5">
                  0{i + 1}
                </span>
                <h3 className="text-[1.15rem] font-heading font-bold mb-3">{title}</h3>
                <p className="text-txt-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-txt-muted text-[0.65rem] tracking-[0.25em] uppercase font-semibold mb-8">
            Our Community
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {photos.map(({ src, alt }) => (
              <div key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <h2 className="text-white font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight max-w-[380px]">
              Ready to get involved?
            </h2>
            <Link
              href="/education"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-ink font-heading font-semibold text-sm rounded-full hover:bg-cyan hover:text-white transition-all duration-200 no-underline"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
