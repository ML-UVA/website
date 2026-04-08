# Google API Integration

## Google Sheets API

Sheet data is fetched server-side in Next.js page components using `getSheetData` from `app/lib/sheets.ts`. This runs at request time (ISR, 5-min cache) and passes data as props to client components.

### Requirements

- The Google Sheet must be set to **"Anyone with the link can view"** (public read access).
- The `GCLOUD_API_KEY` environment variable must be set in `.env.local` (development) or in Vercel project settings (production).

### How to fetch a sheet

In any `app/.../page.tsx` server component:

```typescript
import { getSheetData } from '@/lib/sheets';

const SHEET_ID = 'your-sheet-id-here'; // from the sheet URL: /spreadsheets/d/<ID>/edit
const RANGE = 'Sheet1!A:E';            // tab name + column range

export default async function MyPage() {
  let rows: string[][] = [];

  try {
    const data = await getSheetData(SHEET_ID, RANGE);
    rows = (data.values || []).slice(1) as string[][]; // slice(1) skips header row
  } catch (e) {
    console.error('Failed to fetch sheet:', e);
    // 404 = wrong sheet ID or sheet was deleted
    // 403 = sheet is not publicly shared
  }

  return <MyClient rows={rows} />;
}
```

Pass `rows` to a `'use client'` component for interactive rendering.

### Finding the Sheet ID

From the sheet URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

### Sheet IDs in use

| Page | Sheet ID |
|------|----------|
| Lectures | `1anBj8NC_n_WC6nwuvCu6uSfZEnri8oJLX9bYGZkDvls` |
| Reading Groups | `1JS3RBTXAIAA9vSivE0WTyEi-rhoZz4QOZM2rskjJFnI` |
| Resources | `1ZH69RftLEFIL7M1TizHYTjWkD2yYyYUpfzJQ0IiBonk` |
| Research | `1uUiExx5mOYZvD8GdKYwIqttYi828coBvUnnEHhvOHaA` |
| Events | `1QOYUEFkj4n4920fJo_Y9v0d4GWmmz9Xl7Tjw3QRjUtc` |
| Team | `1-LeB821N5hDANcH0ZDKEn22jsmpSp3I3SNLSJFkAYR0` |

## Google Maps API

The Maps embed URL is generated server-side in `app/actions.ts` via `getGoogleMapsUrl()`. To embed a map, pass a Google Maps place URL query string:

```typescript
// In a server component or action:
const mapUrl = await getGoogleMapsUrl('Olsson+Hall+UVA');

// In JSX:
<iframe width="100%" height="300" src={mapUrl} />
```

To get the query string from a Google Maps link, take everything between `/place/` and `?entry=` in the URL.
