import axios from "axios";
// import { api } from "@/lib/api";

// const GCLOUD_API_KEY = await api.search("VITE_GCLOUD_API_KEY");
const GCLOUD_API_KEY = import.meta.env.VITE_GCLOUD_API_KEY;

const SHEET_ID = "1JS3RBTXAIAA9vSivE0WTyEi-rhoZz4QOZM2rskjJFnI"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A:AC"; // Adjust the range as per your sheet

export type readingGroupRowData = {
  article: string;
  link: string;
  presentedBy: string;
  presentationDate: string;
};

export const getReadingSheetData = async (): Promise<readingGroupRowData[]> => {
  try {
    const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${
      GCLOUD_API_KEY
    }`;
    const response = await axios.get(api_url);
    const rows: string[][] = response.data.values || [];
    
    // Validate and filter rows - require article and link at minimum
    const data: readingGroupRowData[] = rows
      .slice(1)
      .filter((row: string[]) => {
        // Filter out rows with missing required fields
        const hasRequiredFields = row[0]?.trim() && row[1]?.trim();
        if (!hasRequiredFields) {
          console.warn("Skipping reading group row with missing required fields (article or link):", row);
        }
        return hasRequiredFields;
      })
      .reverse()
      .map((row: string[]) => {
        return {
          article: row[0]?.trim() || "",
          link: row[1]?.trim() || "",
          presentedBy: row[2]?.trim() || "",
          presentationDate: row[3]?.trim() || "",
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
};
