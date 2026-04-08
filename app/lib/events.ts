import { getSheetData } from './sheets';

const SHEET_ID = '1QOYUEFkj4n4920fJo_Y9v0d4GWmmz9Xl7Tjw3QRjUtc';
const RANGE = 'Sheet1!A:AC';

export interface EventItem {
  id: number;
  complete: boolean;
  name: string;
  date: Date;
  time: string;
  location: string;
  location_long?: string;
  header1: string;
  short_desc: string;
  header2?: string;
  sub_header1?: string;
  long_description_col_1?: string;
  sub_header2?: string;
  long_description_col_2?: string;
  sub_header3?: string;
  long_description_col_3?: string;
  google_maps_link: string;
  link1?: string;
  link1_name?: string;
  link2?: string;
  link2_name?: string;
  link3?: string;
  link3_name?: string;
  url_name: string;
  banner_img_path: string;
  img1_path: string;
  img2_path?: string;
  img3_path?: string;
  img4_path?: string;
  img5_path?: string;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function convertDriveLink(link: string): string {
  if (!link) return '';
  const start = link.indexOf('/d/') + 3;
  const end = link.lastIndexOf('/');
  return 'https://lh3.googleusercontent.com/d/' + link.substring(start, end);
}

function extractGoogleMapsLink(link: string): string {
  const startPos = link.indexOf('/place/') + 7;
  const endPos = link.indexOf('&entry');
  return link.substring(startPos, endPos);
}

export { extractGoogleMapsLink };

function formatURLName(eventName: string, date: Date): string {
  const dateStr = formatDate(date);
  return (eventName.replace(/ /g, '_') + '_' + dateStr.replace(/ /g, '_').replace(/,/g, '')).toLowerCase();
}

const defaults: EventItem = {
  id: -1, complete: false, name: 'Loading...', date: new Date(), time: '', location: 'Loading...',
  location_long: '', header1: '', short_desc: '', header2: '', sub_header1: '', long_description_col_1: '',
  sub_header2: '', long_description_col_2: '', sub_header3: '', long_description_col_3: '', google_maps_link: '',
  link1: '', link1_name: '', link2: '', link2_name: '', link3: '', link3_name: '',
  url_name: 'events/hi', banner_img_path: '/img/sigai-header-banner.jpeg',
  img1_path: '/img/portfolio/1.jpg', img2_path: '', img3_path: '', img4_path: '', img5_path: '',
};

export async function getAllEventData(): Promise<EventItem[]> {
  try {
    const resp = await getSheetData(SHEET_ID, RANGE);
    const rows: (string | number)[][] = resp.values || [];

    return rows.slice(1)
      .filter((r) => r[0] != null && r[0] !== '' && String(r[2]).trim() && String(r[3]).trim() && String(r[4]).trim() && String(r[5]).trim())
      .map((r) => {
        const [id,complete,name,date,time,location,location_long,header1,short_desc,header2,
          sub_header1,long_description_col_1,sub_header2,long_description_col_2,sub_header3,
          long_description_col_3,google_maps_link,link1_name,link1,link2_name,link2,link3_name,
          link3,banner_img_path,img1_path,img2_path,img3_path,img4_path,img5_path] = r;

        return {
          id: Number(id) || defaults.id,
          complete: complete === 'TRUE',
          name: String(name) || defaults.name,
          date: new Date(date) || defaults.date,
          time: String(time) || defaults.time,
          location: String(location) || defaults.location,
          location_long: location_long ? String(location_long) : defaults.location_long,
          header1: String(header1) || defaults.header1,
          short_desc: String(short_desc) || defaults.short_desc,
          header2: header2 ? String(header2) : defaults.header2,
          sub_header1: sub_header1 ? String(sub_header1) : defaults.sub_header1,
          long_description_col_1: long_description_col_1 ? String(long_description_col_1) : defaults.long_description_col_1,
          sub_header2: sub_header2 ? String(sub_header2) : defaults.sub_header2,
          long_description_col_2: long_description_col_2 ? String(long_description_col_2) : defaults.long_description_col_2,
          sub_header3: sub_header3 ? String(sub_header3) : defaults.sub_header3,
          long_description_col_3: long_description_col_3 ? String(long_description_col_3) : defaults.long_description_col_3,
          google_maps_link: google_maps_link ? String(google_maps_link) : defaults.google_maps_link,
          link1: link1 ? String(link1) : defaults.link1,
          link1_name: link1_name ? String(link1_name) : defaults.link1_name,
          link2: link2 ? String(link2) : defaults.link2,
          link2_name: link2_name ? String(link2_name) : defaults.link2_name,
          link3: link3 ? String(link3) : defaults.link3,
          link3_name: link3_name ? String(link3_name) : defaults.link3_name,
          url_name: '/events/' + formatURLName(String(name), new Date(date)),
          banner_img_path: banner_img_path ? convertDriveLink(String(banner_img_path)) : defaults.banner_img_path,
          img1_path: img1_path ? convertDriveLink(String(img1_path)) : defaults.img1_path,
          img2_path: img2_path ? convertDriveLink(String(img2_path)) : defaults.img2_path,
          img3_path: img3_path ? convertDriveLink(String(img3_path)) : defaults.img3_path,
          img4_path: img4_path ? convertDriveLink(String(img4_path)) : defaults.img4_path,
          img5_path: img5_path ? convertDriveLink(String(img5_path)) : defaults.img5_path,
        };
      });
  } catch (error) {
    console.error('Error fetching event data:', error);
    return [];
  }
}
