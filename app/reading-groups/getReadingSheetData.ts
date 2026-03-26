import { fetchGoogleSheet } from "@/actions";

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
    const dataResponse = await fetchGoogleSheet(SHEET_ID, RANGE);
    const rows: string[][] = dataResponse.values || [];
    
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
    return [];
  }
};
