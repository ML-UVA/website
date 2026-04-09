import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getSheetData } from '@/lib/sheets';
import TeamClient from '@/teams/TeamClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about ML@UVA — our mission, pillars, and community at the University of Virginia.',
};

const TEAM_SHEET_ID = '1-LeB821N5hDANcH0ZDKEn22jsmpSp3I3SNLSJFkAYR0';

function convertDriveLink(link: string): string {
  if (!link) return '';
  const start = link.indexOf('/d/') + 3;
  const end = link.lastIndexOf('/');
  return 'https://lh3.googleusercontent.com/d/' + link.substring(start, end);
}

const pillars = [
  { title: 'Education', desc: 'Comprehensive learning through lectures, reading groups, and workshops. We meet students where they are and build from there. No prior ML experience required.' },
  { title: 'Research', desc: 'Collaborate on original research in emerging ML subfields. We provide resources, mentorship, and funding to help student-led projects go further.' },
  { title: 'Partnerships', desc: 'Connect top talent with industry leaders and research institutions through consulting engagements, speaker events, and strategic collaborations.' },
];

export default async function About() {
  let members: { name: string; position: string; git: string; linkedin: string; imgSrc: string; type: string }[] = [];

  try {
    const data = await getSheetData(TEAM_SHEET_ID, 'Sheet1!A:F');
    members = (data.values || []).slice(1)
      .filter((r: string[]) => r[0]?.trim() && r[1]?.trim())
      .map((r: string[]) => ({
        name: r[0]?.trim() || '',
        position: r[1]?.trim() || '',
        git: r[2]?.trim() || '',
        linkedin: r[3]?.trim() || '',
        imgSrc: r[4]?.trim() ? convertDriveLink(r[4].trim()) : '/team/default-profile.jpg',
        type: r[5]?.trim() || 'Other',
      }));
  } catch (e) {
    console.error('Error fetching team data:', e);
  }

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
              <p className="text-orange text-[0.65rem] tracking-[0.25em] uppercase font-semibold font-body mb-3">
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

      {/* Team */}
      <section className="border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-4">
          <p className="text-orange text-[0.65rem] tracking-[0.25em] uppercase font-semibold font-body mb-3">
            Leadership
          </p>
          <h2 className="font-heading font-extrabold text-[2.4rem] leading-tight tracking-tight">
            Meet our team.
          </h2>
        </div>
        <TeamClient members={members} />
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
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-ink font-heading font-semibold text-sm rounded-full hover:bg-orange hover:text-white transition-all duration-200 no-underline"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
