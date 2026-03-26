import { useEffect, useState } from "react";
import axios from "axios";

const SHEET_ID = "1QOYUEFkj4n4920fJo_Y9v0d4GWmmz9Xl7Tjw3QRjUtc"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A:AC"; // Adjust the range as per your sheet

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function convertDriveLink(link: string): string {
  const startString = "/d/";
  const endString = "/";
  const startPosition = link.indexOf(startString) + startString.length;
  const endPosition = link.lastIndexOf(endString);
  const ret =
    "https://lh3.googleusercontent.com/d/" +
    link.substring(startPosition, endPosition);
  return ret;
}

export function extractGoogleMapsLink(link: string): string {
  const startString = "/place/";
  const endString = "&entry";
  const startPosition = link.indexOf(startString) + startString.length;
  const endPosition = link.indexOf(endString);
  const ret = link.substring(startPosition, endPosition);
  return ret;
}

export function formatURLName(eventName: string, date: Date): string {
  const dateStr = formatDate(date);
  return (
    eventName.replace(/ /g, "_") +
    "_" +
    dateStr.replace(/ /g, "_").replace(/,/g, "")
  ).toLowerCase();
}

interface longDescItem {
  header: string;
  content: string;
}

interface linkItem {
  name: string;
  link: string;
}

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

const dummyData: EventItem = {
  id: -1,
  complete: false,
  name: "Loading...",
  date: new Date(),
  time: "",
  location: "Loading...",
  location_long: "",
  header1: "",
  short_desc: "",
  header2: "",
  sub_header1: "",
  long_description_col_1: "",
  sub_header2: "",
  long_description_col_2: "",
  sub_header3: "",
  long_description_col_3: "",
  google_maps_link: "",
  link1: "",
  link1_name: "",
  link2: "",
  link2_name: "",
  link3: "",
  link3_name: "",
  url_name: "events/hi",
  banner_img_path: "..//img/sigai-header-banner.jpg",
  img1_path: "..//img/portfolio/1.jpg",
  img2_path: "",
  img3_path: "",
  img4_path: "",
  img5_path: "",
};

export async function getAllEventSheetData(): Promise<EventItem[]> {
  try {
    const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${
      import.meta.env.VITE_GCLOUD_API_KEY
    }`;
    const response = await axios.get(api_url);

    const rows: (string | number)[][] = response.data.values || [];
    
    // Validate and filter rows - require essential event fields
    const data = rows
      .slice(1)
      .filter((row: (string | number)[]) => {
        // Filter out rows with missing required fields (id, name, date, time, location)
        const hasRequiredFields = 
          row[0] !== undefined && row[0] !== null && row[0] !== '' &&  // id
          row[2] !== undefined && row[2] !== null && String(row[2]).trim() && // name
          row[3] !== undefined && row[3] !== null && String(row[3]).trim() && // date
          row[4] !== undefined && row[4] !== null && String(row[4]).trim() && // time
          row[5] !== undefined && row[5] !== null && String(row[5]).trim();   // location
        
        if (!hasRequiredFields) {
          console.warn("Skipping event row with missing required fields (id, name, date, time, or location):", row);
        }
        return hasRequiredFields;
      })
      .map((row: (string | number)[]) => {
      const [
        id,
        complete,
        name,
        date,
        time,
        location,
        location_long,
        header1,
        short_desc,
        header2,
        sub_header1,
        long_description_col_1,
        sub_header2,
        long_description_col_2,
        sub_header3,
        long_description_col_3,
        google_maps_link,
        link1_name,
        link1,
        link2_name,
        link2,
        link3_name,
        link3,
        banner_img_path,
        img1_path,
        img2_path,
        img3_path,
        img4_path,
        img5_path,
      ] = row;

      return {
        id: Number(id) || dummyData.id,
        complete: Boolean(complete === "TRUE") || dummyData.complete,
        name: String(name) || dummyData.name,
        date: new Date(date) || dummyData.date,
        time: String(time) || dummyData.time,
        location: String(location) || dummyData.location,
        location_long: location_long
          ? String(location_long)
          : dummyData.location_long,
        header1: String(header1) || dummyData.header1,
        short_desc: String(short_desc) || dummyData.short_desc,
        header2: header2 ? String(header2) : dummyData.header2,
        sub_header1: sub_header1 ? String(sub_header1) : dummyData.sub_header1,
        long_description_col_1: long_description_col_1
          ? String(long_description_col_1)
          : dummyData.long_description_col_1,
        sub_header2: sub_header2 ? String(sub_header2) : dummyData.sub_header2,
        long_description_col_2: long_description_col_2
          ? String(long_description_col_2)
          : dummyData.long_description_col_2,
        sub_header3: sub_header3 ? String(sub_header3) : dummyData.sub_header3,
        long_description_col_3: long_description_col_3
          ? String(long_description_col_3)
          : dummyData.long_description_col_3,
        google_maps_link: google_maps_link
          ? String(google_maps_link)
          : dummyData.google_maps_link,
        link1: link1 ? String(link1) : dummyData.link1,
        link1_name: link1_name ? String(link1_name) : dummyData.link1_name,
        link2: link2 ? String(link2) : dummyData.link2,
        link2_name: link2_name ? String(link2_name) : dummyData.link2_name,
        link3: link3 ? String(link3) : dummyData.link3,
        link3_name: link3_name ? String(link3_name) : dummyData.link3_name,
        url_name: "/events/" + formatURLName(String(name), new Date(date)),
        banner_img_path: banner_img_path
          ? convertDriveLink(String(banner_img_path))
          : dummyData.banner_img_path,
        img1_path: img1_path
          ? convertDriveLink(String(img1_path))
          : dummyData.img1_path,
        img2_path: img2_path
          ? convertDriveLink(String(img2_path))
          : dummyData.img2_path,
        img3_path: img3_path
          ? convertDriveLink(String(img3_path))
          : dummyData.img3_path,
        img4_path: img4_path
          ? convertDriveLink(String(img4_path))
          : dummyData.img4_path,
        img5_path: img5_path
          ? convertDriveLink(String(img5_path))
          : dummyData.img5_path,
      };
    });
    return data;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        console.error("API key is invalid or Google Sheets API is not enabled");
      } else if (error.response?.status === 404) {
        console.error("Sheet ID is incorrect or sheet not found");
      }
    }
    return [];
  }
}

export function useEventSheetData(eventIdx: number) {
  const [eventItem, setEventItem] = useState<EventItem>(dummyData);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [linkList, setLinkList] = useState<linkItem[]>([]);
  const [longDescList, setLongDescList] = useState<longDescItem[]>([]);
  const [imgPathList, setImgPathList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEventSheetData();
      setEventItem(data[eventIdx]);

      const linkItems: linkItem[] = [
        [data[eventIdx].link1_name, data[eventIdx].link1],
        [data[eventIdx].link2_name, data[eventIdx].link2],
        [data[eventIdx].link3_name, data[eventIdx].link3],
      ]
        .filter(
          (item): item is [string, string] =>
            item[0] !== undefined &&
            item[1] !== undefined &&
            item[0] !== "" &&
            item[1] !== ""
        )
        .map(([name, link]) => ({ name, link }));
      setLinkList(linkItems);

      const longDescItems: longDescItem[] = [
        [data[eventIdx].sub_header1, data[eventIdx].long_description_col_1],
        [data[eventIdx].sub_header2, data[eventIdx].long_description_col_2],
        [data[eventIdx].sub_header3, data[eventIdx].long_description_col_3],
      ]
        .filter(
          (item): item is [string, string] =>
            item[1] !== undefined && item[1] !== ""
        )
        .map(([header, content]) => ({ header, content }));
      setLongDescList(longDescItems);

      const imgItems: string[] = [
        data[eventIdx].img1_path,
        data[eventIdx].img2_path,
        data[eventIdx].img3_path,
        data[eventIdx].img4_path,
        data[eventIdx].img5_path,
      ]
        .filter((item): item is string => item !== undefined && item !== "")
        .map((item) => item);
      setImgPathList(imgItems);

      setTimeout(() => {
        setLoading(false);
        setFadeIn(true);
      }, 200);
    };

    fetchData();
  }, [eventIdx]);

  return {
    eventItem,
    loading,
    fadeIn,
    linkList,
    longDescList,
    imgPathList,
  };
}
