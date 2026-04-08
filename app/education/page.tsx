import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import EducationClient from './EducationClient';
import { getSheetData } from '@/lib/sheets';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Lectures, reading groups, and learning resources from ML@UVA.',
};

const LECTURES_SHEET_ID = '1anBj8NC_n_WC6nwuvCu6uSfZEnri8oJLX9bYGZkDvls';
const READING_SHEET_ID = '1JS3RBTXAIAA9vSivE0WTyEi-rhoZz4QOZM2rskjJFnI';
const RESOURCES_SHEET_ID = '1ZH69RftLEFIL7M1TizHYTjWkD2yYyYUpfzJQ0IiBonk';

export default async function EducationPage() {
  let lectureRows: string[][] = [];
  let readingRows: string[][] = [];
  let resourceRows: string[][] = [];
  let fetchError: string | null = null;

  try {
    const [lectureData, readingData, resourceData] = await Promise.all([
      getSheetData(LECTURES_SHEET_ID, 'Sheet1!A:H'),
      getSheetData(READING_SHEET_ID, 'Sheet1!A:D'),
      getSheetData(RESOURCES_SHEET_ID, 'Sheet1!A:E'),
    ]);
    lectureRows = (lectureData.values || []).slice(1) as string[][];
    readingRows = (readingData.values || []).slice(1) as string[][];
    resourceRows = (resourceData.values || []).slice(1) as string[][];
  } catch (e) {
    fetchError = e instanceof Error ? e.message : String(e);
    console.error('Error fetching education data:', fetchError);
  }

  return (
    <div>
      <PageHero
        title="Education"
        subtitle="Empowering the next generation of ML practitioners through lectures, reading groups, and curated resources."
      />
      {fetchError && (
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-700 font-body">
            <strong>Data load error:</strong> {fetchError}
            {fetchError?.includes('404') && (
              <p className="mt-1 text-red-500 text-xs">404 means the spreadsheet IDs are invalid or the sheets were deleted/moved. Update the sheet IDs in <code className="font-mono bg-red-100 px-1 rounded">app/education/page.tsx</code>.</p>
            )}
          </div>
        </div>
      )}
      <EducationClient
        lectureRows={lectureRows}
        readingRows={readingRows}
        resourceRows={resourceRows}
      />
    </div>
  );
}
