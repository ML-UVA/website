import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { SITE_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Partnerships',
  description: 'Partner with ML@UVA to advance machine learning innovation and education.',
};

const engagements = [
  {
    number: '01',
    title: 'Client Projects',
    desc: 'Our research teams take on semester-long engagements with industry partners, delivering ML solutions to real problems. See our current and past projects on the Research page.',
    link: '/research',
    linkLabel: 'View projects',
  },
  {
    number: '02',
    title: 'Consulting',
    desc: 'Need a focused ML audit, prototype, or analysis? We can pair your challenge with a small team of experienced members for a scoped engagement.',
    link: null,
    linkLabel: null,
  },
  {
    number: '03',
    title: 'Speaker Events',
    desc: 'Bring your researchers or engineers to speak directly with our members. We handle promotion and logistics; you get direct access to ML-focused students.',
    link: null,
    linkLabel: null,
  },
  {
    number: '04',
    title: 'Research Collaboration',
    desc: 'Partner with student research groups on longer-horizon projects at the intersection of industry needs and cutting-edge ML research.',
    link: null,
    linkLabel: null,
  },
];

export default function Partnerships() {
  return (
    <div>
      <PageHero
        title="Partnerships"
        subtitle="Work with ML@UVA to connect with talented students and advance real machine learning projects."
      />

      {/* Intro */}
      <section className="py-28 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 items-start">
            <div>
              <p className="text-orange text-[0.65rem] tracking-[0.25em] uppercase font-semibold font-body mb-3">
                How we work
              </p>
              <h2 className="font-heading font-extrabold text-[2rem] leading-tight tracking-tight">
                Built for real engagement.
              </h2>
            </div>
            <p className="text-txt-secondary text-[1.1rem] leading-relaxed pt-2 lg:pt-10">
              Our industry partnerships center on our client project program, where student teams work
              directly with companies on semester-long ML engagements. We also host speaker events and
              support consulting arrangements for more focused scopes. If you are interested in working
              with us, reach out and we will find the right format.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement types */}
      <section className="py-28 border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <h2 className="font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight max-w-[400px]">
              How we work<br />together.
            </h2>
            <p className="text-txt-muted text-sm max-w-[280px] leading-relaxed md:text-right">
              Four formats, all built around meaningful collaboration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {engagements.map(({ number, title, desc, link, linkLabel }) => (
              <div key={number} className="bg-white p-10">
                <span className="text-[2.5rem] font-heading font-black leading-none text-line block mb-5">
                  {number}
                </span>
                <h3 className="text-[1.15rem] font-heading font-bold mb-3">{title}</h3>
                <p className="text-txt-secondary text-sm leading-relaxed mb-4">{desc}</p>
                {link && linkLabel && (
                  <Link href={link} className="text-orange text-[0.75rem] font-heading font-semibold tracking-wide uppercase no-underline hover:text-orange-dark transition-colors">
                    {linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div>
              <p className="text-white/25 text-[0.65rem] tracking-[0.3em] uppercase font-body mb-5">
                Get in touch
              </p>
              <h2 className="text-white font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight max-w-[420px]">
                Ready to partner<br />with us?
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-white/35 text-sm leading-relaxed max-w-[300px]">
                Reach out and we will find the right engagement format for your goals.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href={`mailto:${SITE_LINKS.contactEmail}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-ink font-heading font-semibold text-sm rounded-full hover:bg-orange hover:text-white transition-all duration-200 no-underline"
                >
                  <Icon name="envelope" className="w-3.5 h-3.5" /> Email us
                </a>
                <a
                  href={SITE_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/70 font-heading font-semibold text-sm rounded-full hover:border-white/50 hover:text-white transition-all duration-200 no-underline"
                >
                  <Icon name="discord" className="w-3.5 h-3.5" /> Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
