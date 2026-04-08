/**
 * Server-side Google Sheets data fetching with ISR caching.
 * Use this in server components instead of the server action.
 */
export async function getSheetData(sheetId: string, range: string) {
  const apiKey = process.env.GCLOUD_API_KEY;
  if (!apiKey) {
    throw new Error('GCLOUD_API_KEY is not defined in environment variables.');
  }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 300 } }); // cache 5 min
  if (!res.ok) {
    throw new Error(`Google Sheets API error: ${res.status}`);
  }
  return res.json();
}

export async function getGoogleMapsEmbedUrl(query: string) {
  const apiKey = process.env.GCLOUD_API_KEY;
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`;
}
