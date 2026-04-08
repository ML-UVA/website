import type { Metadata } from 'next';
import { getSheetData } from '@/lib/sheets';
import PageHero from '@/components/PageHero';
import TeamClient from './TeamClient';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the leadership team behind ML@UVA.',
};

function convertDriveLink(link: string): string {
  if (!link) return '';
  const start = link.indexOf('/d/') + 3;
  const end = link.lastIndexOf('/');
  return 'https://lh3.googleusercontent.com/d/' + link.substring(start, end);
}

const SHEET_ID = '1-LeB821N5hDANcH0ZDKEn22jsmpSp3I3SNLSJFkAYR0';

export default async function TeamPage() {
  let members: { name: string; position: string; git: string; linkedin: string; imgSrc: string; type: string }[] = [];

  try {
    const data = await getSheetData(SHEET_ID, 'Sheet1!A:F');
    members = (data.values || []).slice(1)
      .filter((r: string[]) => r[0]?.trim() && r[1]?.trim())
      .map((r: string[]) => ({
        name: r[0]?.trim() || '', position: r[1]?.trim() || '',
        git: r[2]?.trim() || '', linkedin: r[3]?.trim() || '',
        imgSrc: r[4]?.trim() ? convertDriveLink(r[4].trim()) : '/img/team/default-profile.jpg',
        type: r[5]?.trim() || 'Other',
      }));
  } catch (e) {
    console.error('Error fetching team data:', e);
  }

  return (
    <div>
      <PageHero title="Our Team" subtitle="Meet the people behind ML@UVA. Our mission is to make AI at UVA accessible and engaging for every student." />
      <TeamClient members={members} />
    </div>
  );
}
