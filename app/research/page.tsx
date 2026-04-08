import type { Metadata } from 'next';
import { getSheetData } from '@/lib/sheets';
import { SITE_LINKS } from '@/lib/constants';
import PageHero from '@/components/PageHero';
import ResearchClient from './ResearchClient';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Collaborative research and industry projects from ML@UVA.',
};

function convertDriveLink(link: string): string {
  if (!link) return '';
  const start = link.indexOf('/d/') + 3;
  const end = link.lastIndexOf('/');
  return 'https://lh3.googleusercontent.com/d/' + link.substring(start, end);
}

const SHEET_ID = '1uUiExx5mOYZvD8GdKYwIqttYi828coBvUnnEHhvOHaA';

export default async function ResearchPage() {
  let projects: { projName: string; group: string; clientLink: string; link: string; img_link: string; tags: string[]; summary: string; recruiting: boolean }[] = [];

  try {
    const data = await getSheetData(SHEET_ID, 'Sheet1!A:G');
    projects = (data.values || []).slice(1)
      .filter((r: string[]) => r[0]?.trim() && r[1]?.trim())
      .map((r: string[]) => ({
        projName: r[0]?.trim() || '', group: r[1]?.trim() || '',
        clientLink: r[2]?.trim() || '', link: r[3]?.trim() || '',
        recruiting: ['true', 'yes', '1'].includes((r[4] || '').toLowerCase().trim()),
        img_link: convertDriveLink(r[5] || ''),
        tags: (r[6] || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        summary: r[7]?.trim() || '',
      }))
      .sort((a: { recruiting: boolean }, b: { recruiting: boolean }) => (a.recruiting === b.recruiting ? 0 : a.recruiting ? -1 : 1));
  } catch (e) {
    console.error('Error fetching research data:', e);
  }

  return (
    <div>
      <PageHero title="Research & Projects" subtitle="Collaborative research and industry projects driving innovation in machine learning." />

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-center text-txt-secondary text-[1.05rem] leading-relaxed max-w-[650px] mx-auto mb-12">
            ML@UVA provides a platform for students and researchers to collaborate on cutting-edge ML research and industry projects.
            Interested? Applications open each semester on our{' '}
            <a href={SITE_LINKS.discord} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:text-navy transition-colors">Discord</a>.
          </p>

          <ResearchClient projects={projects} />
        </div>
      </section>
    </div>
  );
}
