# Adding a New Page

## File structure

```
app/
  your-page/
    page.tsx          ← server component (data fetching, metadata)
    YourPageClient.tsx ← client component (interactivity, if needed)
```

## 1. Create the server component

`app/your-page/page.tsx`:

```typescript
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import YourPageClient from './YourPageClient';
import { getSheetData } from '@/lib/sheets'; // only if using Google Sheets

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Short description for SEO.',
};

export default async function YourPage() {
  // Fetch data server-side (optional)
  let rows: string[][] = [];
  try {
    const data = await getSheetData('YOUR_SHEET_ID', 'Sheet1!A:E');
    rows = (data.values || []).slice(1) as string[][];
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <PageHero title="Your Page" subtitle="A short description shown under the title." />
      <YourPageClient rows={rows} />
    </div>
  );
}
```

See [google-sheets-api.md](google-sheets-api.md) for sheet ID lookup and setup.

## 2. Create the client component (if needed)

Only add `'use client'` if the page needs interactivity (tabs, dropdowns, state, etc.).

`app/your-page/YourPageClient.tsx`:

```typescript
'use client';

interface Props {
  rows: string[][];
}

export default function YourPageClient({ rows }: Props) {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* your UI here */}
      </div>
    </section>
  );
}
```

If the page is purely static (no interactivity), render everything directly in `page.tsx` — no separate client component needed.

## 3. Add to the navbar

In `app/components/Header.tsx`, add an entry to `navItems`:

```typescript
const navItems = [
  { name: 'About', link: '/about' },
  // ...
  { name: 'Your Page', link: '/your-page' }, // add here
];
```

Links appear in the order listed.

## Styling

- Use Tailwind utility classes directly — no separate CSS files needed.
- Wrap page content in `max-w-[1200px] mx-auto px-6` to match the site's layout.
- Colors: use `text-orange` / `bg-orange` for UVA orange (`#FF9900`) accents sparingly.
- See `tailwind.config.js` for the full color palette (`txt`, `navy`, `orange`, `line`, `surface`, etc.).
