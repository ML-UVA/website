'use client';
import { useEffect, useState } from 'react';
import { fetchGoogleSheet, getGoogleMapsUrl } from '@/actions';
import type { EventItem } from '@/lib/events';

// Re-export types for backward compat
export type { EventItem } from '@/lib/events';
export { formatDate, convertDriveLink, extractGoogleMapsLink } from '@/lib/events';

const SHEET_ID = '1QOYUEFkj4n4920fJo_Y9v0d4GWmmz9Xl7Tjw3QRjUtc';
const RANGE = 'Sheet1!A:AC';

function convertDriveLinkLocal(link: string): string {
  if (!link) return '';
  const start = link.indexOf('/d/') + 3;
  const end = link.lastIndexOf('/');
  return 'https://lh3.googleusercontent.com/d/' + link.substring(start, end);
}

function formatURLName(name: string, date: Date): string {
  const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (name.replace(/ /g, '_') + '_' + dateStr.replace(/ /g, '_').replace(/,/g, '')).toLowerCase();
}

function extractMapsQuery(link: string): string {
  const start = link.indexOf('/place/') + 7;
  const end = link.indexOf('&entry');
  return link.substring(start, end);
}

const defaults = {
  id: -1, complete: false, name: 'Loading...', date: new Date(), time: '', location: 'Loading...',
  location_long: '', header1: '', short_desc: '', header2: '', sub_header1: '', long_description_col_1: '',
  sub_header2: '', long_description_col_2: '', sub_header3: '', long_description_col_3: '', google_maps_link: '',
  link1: '', link1_name: '', link2: '', link2_name: '', link3: '', link3_name: '',
  url_name: 'events/hi', banner_img_path: '/events/sigai-header-banner.jpeg',
  img1_path: '/events/1.jpg', img2_path: '', img3_path: '', img4_path: '', img5_path: '',
};

export async function getAllEventSheetData(): Promise<EventItem[]> {
  try {
    const resp = await fetchGoogleSheet(SHEET_ID, RANGE);
    const rows: (string | number)[][] = resp.values || [];
    return rows.slice(1)
      .filter((r) => r[0] != null && r[0] !== '' && String(r[2]).trim() && String(r[3]).trim() && String(r[4]).trim() && String(r[5]).trim())
      .map((r) => {
        const [id,complete,name,date,time,location,location_long,header1,short_desc,header2,
          sub_header1,long_description_col_1,sub_header2,long_description_col_2,sub_header3,
          long_description_col_3,google_maps_link,link1_name,link1,link2_name,link2,link3_name,
          link3,banner_img_path,img1_path,img2_path,img3_path,img4_path,img5_path] = r;
        return {
          id: Number(id) || defaults.id, complete: complete === 'TRUE',
          name: String(name), date: new Date(date), time: String(time),
          location: String(location), location_long: location_long ? String(location_long) : '',
          header1: String(header1), short_desc: String(short_desc),
          header2: header2 ? String(header2) : '', sub_header1: sub_header1 ? String(sub_header1) : '',
          long_description_col_1: long_description_col_1 ? String(long_description_col_1) : '',
          sub_header2: sub_header2 ? String(sub_header2) : '',
          long_description_col_2: long_description_col_2 ? String(long_description_col_2) : '',
          sub_header3: sub_header3 ? String(sub_header3) : '',
          long_description_col_3: long_description_col_3 ? String(long_description_col_3) : '',
          google_maps_link: google_maps_link ? String(google_maps_link) : '',
          link1: link1 ? String(link1) : '', link1_name: link1_name ? String(link1_name) : '',
          link2: link2 ? String(link2) : '', link2_name: link2_name ? String(link2_name) : '',
          link3: link3 ? String(link3) : '', link3_name: link3_name ? String(link3_name) : '',
          url_name: '/events/' + formatURLName(String(name), new Date(date)),
          banner_img_path: banner_img_path ? convertDriveLinkLocal(String(banner_img_path)) : defaults.banner_img_path,
          img1_path: img1_path ? convertDriveLinkLocal(String(img1_path)) : defaults.img1_path,
          img2_path: img2_path ? convertDriveLinkLocal(String(img2_path)) : '',
          img3_path: img3_path ? convertDriveLinkLocal(String(img3_path)) : '',
          img4_path: img4_path ? convertDriveLinkLocal(String(img4_path)) : '',
          img5_path: img5_path ? convertDriveLinkLocal(String(img5_path)) : '',
        };
      });
  } catch (error) {
    console.error('Error fetching event data:', error);
    return [];
  }
}

interface LinkItem { name: string; link: string }
interface LongDescItem { header: string; content: string }

export function useEventSheetData(eventIdx: number) {
  const [eventItem, setEventItem] = useState<EventItem>(defaults as EventItem);
  const [loading, setLoading] = useState(true);
  const [linkList, setLinkList] = useState<LinkItem[]>([]);
  const [longDescList, setLongDescList] = useState<LongDescItem[]>([]);
  const [imgPathList, setImgPathList] = useState<string[]>([]);
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllEventSheetData();
      const ev = data[eventIdx];
      if (!ev) { setLoading(false); return; }
      setEventItem(ev);

      if (ev.google_maps_link) {
        const q = extractMapsQuery(ev.google_maps_link);
        const url = await getGoogleMapsUrl(q);
        setMapUrl(url);
      }

      setLinkList(
        [[ev.link1_name, ev.link1], [ev.link2_name, ev.link2], [ev.link3_name, ev.link3]]
          .filter((p): p is [string, string] => !!p[0] && !!p[1])
          .map(([name, link]) => ({ name, link }))
      );

      setLongDescList(
        [[ev.sub_header1, ev.long_description_col_1], [ev.sub_header2, ev.long_description_col_2], [ev.sub_header3, ev.long_description_col_3]]
          .filter((p): p is [string, string] => !!p[1])
          .map(([header, content]) => ({ header, content }))
      );

      setImgPathList(
        [ev.img1_path, ev.img2_path, ev.img3_path, ev.img4_path, ev.img5_path]
          .filter((s): s is string => !!s)
      );

      setLoading(false);
    };
    fetch();
  }, [eventIdx]);

  return { eventItem, loading, linkList, longDescList, imgPathList, mapUrl };
}
