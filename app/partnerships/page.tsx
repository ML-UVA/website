import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { SITE_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Partnerships',
  description: 'Partner with ML@UVA to advance machine learning innovation and education.',
};

const partnershipTypes = [
  { icon: 'fa-solid fa-briefcase', title: 'Consulting Partnerships', desc: 'Connect with experienced ML@UVA members to tackle cutting-edge machine learning challenges. Our consulting teams provide innovative solutions to complex business problems.' },
  { icon: 'fa-solid fa-building', title: 'Industry Partnerships', desc: 'Access top undergraduate and graduate talent in ML. We offer multiple engagement formats throughout the semester tailored to connect your company with our vibrant community.' },
  { icon: 'fa-solid fa-microscope', title: 'Research Collaborations', desc: 'Collaborate on original research at the intersection of exciting ML subfields. Work with talented student researchers on cutting-edge projects with real-world applications.' },
];

const benefits = [
  { icon: 'fa-solid fa-users', label: '200+ Active Members' },
  { icon: 'fa-solid fa-graduation-cap', label: 'Top CS Talent at UVA' },
  { icon: 'fa-solid fa-calendar', label: 'Semester-long Engagements' },
  { icon: 'fa-solid fa-rocket', label: 'Real-World ML Solutions' },
];

export default function Partnerships() {
  return (
    <div>
      <PageHero title="Partnerships" subtitle="Work with ML@UVA to advance machine learning innovation and education" />

      {/* Types */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {partnershipTypes.map(({ icon, title, desc }, i) => (
              <div key={i} className="bg-white border border-line border-l-4 border-l-brand-cyan rounded-2xl p-8 text-center hover:translate-y-[-4px] hover:shadow-hover transition-all">
                <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-brand-cyan to-navy flex items-center justify-center text-white text-xl mx-auto mb-5">
                  <i className={icon} />
                </div>
                <h3 className="mb-3">{title}</h3>
                <p className="text-txt-secondary text-[0.95rem] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-surface-light">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="mb-10">Why Partner With Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-7 max-w-[800px] mx-auto">
            {benefits.map(({ icon, label }) => (
              <div key={label} className="group flex flex-col items-center gap-3.5">
                <div className="w-16 h-16 rounded-full bg-surface-subtle flex items-center justify-center text-brand-cyan text-xl group-hover:bg-brand-cyan group-hover:text-white group-hover:translate-y-[-4px] group-hover:shadow-card transition-all">
                  <i className={icon} />
                </div>
                <span className="font-heading font-semibold text-navy text-[0.95rem]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-white mb-4">Ready to Partner With Us?</h2>
          <p className="text-white/80 max-w-[600px] mx-auto mb-8">
            We&apos;re always looking for organizations interested in collaborating with talented ML students and researchers.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href={`mailto:${SITE_LINKS.contactEmail}`}
              className="inline-flex items-center gap-2 px-7 py-3 bg-brand-cyan text-white font-heading font-semibold text-sm rounded-md hover:bg-white hover:text-navy transition-all no-underline">
              <i className="fas fa-envelope" /> Get in Touch
            </a>
            <a href={SITE_LINKS.discord} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-white/30 text-white/85 font-heading font-semibold text-sm rounded-md hover:border-white hover:text-white transition-all no-underline">
              <i className="fab fa-discord" /> Join our Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
