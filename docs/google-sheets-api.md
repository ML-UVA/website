# Google API Integration

## Google Sheets API

This React TypeScript application utilizes the Google Sheets API to dynamically retrieve and display lecture information stored in a Google Sheet. The fetched data includes lecture names, dates, slide links, and video links, which are rendered on the front end.

### Google Sheets

[Link to Sheet in this example](https://docs.google.com/spreadsheets/d/1OFQbNyCAk438fmyz7ZgOfPuN0iTs3bwIQ61T3axvK9E/edit?gid=0#gid=0)

- Must be public (anyone can view)

#### API Request URL:

```typescript
const RANGE = "Seet1!A:D"; // Ahdjust the range as per your sheet
const SHEET_ID = "1OFQbNyCAk438fmyz7ZgOfPuN0iTs3bwIQ61T3axvK9E"; // Replace with your Google Sheet ID

const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${
  import.meta.env.VITE_GCLOUD_API_KEY
}`;
```

- Range
  - Notice the columns in the google sheet itself go from A:D - this must be reocrded in the Request URL
- Sheet ID
  - Taken from the URL of the google sheet itself - in between the `/d/` and `/edit`
- API Key
  - Importing environment variables: `import.meta.env.VITE_VARIABLENAE`
    - need the `VITE_` part
  - Keys saved in `sigai_site/.env.production` or `sigai_site/.env.production`, depending on build, but you still call `import.meta.env.VITE_VARIABLENAE`, NOT `import.meta.env.production.VITE_VARIABLENAE` OR `import.meta.env.development.VITE_VARIABLENAE`

### Code Explanation

#### Importing Required Modules and Setting Up Constants

The following code snippet demonstrates the necessary imports and the setup of key constants used for fetching data from Google Sheets.

```typescript
import axios from "axios";
import { useState, useEffect } from "react";

interface LectureItem {
  name: string;
  date: string;
  slides?: string;
  video?: string;
}

const SHEET_ID = "1OFQbNyCAk438fmyz7ZgOfPuN0iTs3bwIQ61T3axvK9E"; // Your Google Sheet ID
const RANGE = "Sheet1!A:D"; // Specify the range in your sheet
```

- LectureItem Interface: Defines the structure of each lecture item retrieved from the Google Sheet, including fields for name, date, slides, and video.
  - Only necessary in this specific example

### Fetching Data with useEffect

The useEffect hook is used to fetch data from the Google Sheets API when the component first renders. Copy and paste this component when using this functionality (change the relevant components of course).

```typescript

const SHEET_ID = "1OFQbNyCAk438fmyz7ZgOfPuN0iTs3bwIQ61T3axvK9E"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A:D"; // Adjust the range as per your sheet


function Lectures() {
  const [sheetData, setSheetData] = useState<LectureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${
          import.meta.env.VITE_GCLOUD_API_KEY
        }`;
        const response = await axios.get(api_url);
        const rows: string[] = response.data.values;
        const data: LectureItem[] = rows.slice(0).map((row) => {
          var slideLink: string = "";
          if (row[2]) {
            slideLink = row[2].replace("/pub?", "/embed?");
          }
          return {
            name: row[0],
            date: row[1],
            slides: slideLink,
            video: row[3],
          };
        });
        setSheetData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
```

- useState Hooks:
  - sheetData holds the array of lecture items fetched from the Google Sheet.
  - loading manages the loading state of the component.
- useEffect Hook:
  - This hook triggers the data fetch from the Google Sheet when the component mounts.
- API URL Construction:
  - The api_url is dynamically constructed using the SHEET_ID, RANGE, and the API key stored in an environment variable (VITE_GCLOUD_API_KEY).

### Processing the Retrieved Data

Once the data is fetched, it is processed and stored in the component’s state.

- Data Transformation:
  - The API response (response.data.values) is an array of arrays, where each inner array represents a row from the Google Sheet.
  - The map function transforms each row into a LectureItem object.
- Handling Google Slides Links:
  - The slides field checks if a link exists in the third column (row[2]). If so, it modifies the link from a public view (/pub?) to an embeddable format (/embed?), making it suitable for use in an iframe.
- State Update:
  - setSheetData updates the sheetData state with the processed data.
- Error Handling:
  - A try-catch block is used to log any errors that occur during the API call or data processing.

## Google Maps API

```typescript
<iframe
  width="100%"
  height="300px"
  src={`https://www.google.com/maps/embed/v1/place?key=${
    import.meta.env.VITE_GCLOUD_API_KEY
  }&q=${encodeURIComponent(
    "Rice+Hall/@38.031623,-78.5134208,17z/data=!3m1!4b1!4m6!3m5!1s0x89b387de913a5b07:0xb964f7ee988d1b26!8m2!3d38.0316188!4d-78.5108459!16s%2Fg%2F11r2wvmstc"
  )}`}
></iframe>
```

Google maps link: `https://www.google.com/maps/place/Rice+Hall/@38.031623,-78.5134208,17z/data=!3m1!4b1!4m6!3m5!1s0x89b387de913a5b07:0xb964f7ee988d1b26!8m2!3d38.0316188!4d-78.5108459!16s%2Fg%2F11r2wvmstc?entry=ttu&g_ep=EgoyMDI0MDgyMC4xIKXMDSoASAFQAw%3D%3D`

Extract everything past `/place/` to `?entry=` then insert into `encodeURIComponent(...)`
