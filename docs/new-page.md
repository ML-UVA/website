# Making a new React Page

Typescript Boilerplate

```typescript
import axios from "axios";
import { useState, useEffect } from "react";
import "./css/NewPage.css";
import "./css/parent.css";

interface NewPageItem {
  ...
}

const SHEET_ID = "1OFQbNyCAk438fmyz7ZgOfPuN0iTs3bwIQ61T3axvK9E"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A:D"; // Adjust the range as per your sheet

export function myFunction(): outputType {
  return ...;
}

function NewPage() {
  const [sheetData, setSheetData] = useState<NewPageItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        ...
    };

    fetchData();
  }, []);

  return (
    ...
  );
}

export default NewPage;
```

## Code Explanation

#### Imports:

- axios: HTTP client used to make requests to the Google Sheets API.
- useState, useEffect: React hooks used for managing state and side effects within the component.
- CSS files (NewPage.css, parent.css): CSS files for styling the component.
  - Remember we use Bootstrap for styling
  - NewPage.css
    - Place in `src/components/css`
    - should ONLY contain page-specific styling - avoid doing this if you can
  - parent.css
    - Place any styling that may be re-used here
    - consult parent.css first to avoid repetitive CSS

#### Interface

The NewPageItem interface is a placeholder where you define the structure of the data you expect to retrieve from the Google Sheet. This structure will be specific to the columns and data types in your Google Sheet.

#### Google Sheets API

See [Google Sheets API](google-sheets-api.md)

#### `return (...)`

JSX Return: This is where you define the structure of the component's UI. You can map through sheetData to dynamically render content based on the fetched data.

#### Export default NewPage

You must do this do access the page in another `.tsx` file

- You do not have to export functions UNLESS you also want to use them in another file

#### Adding new page to NavBar

Add your new page to `sigai_site/src/components/Header.tsx`:

```typescript
const headersItems = [
    { name: "Home", link: "/", component: <Body /> },
    ...,
    { name: "Team", link: "/team", component: <Team /> },
    { name: "PageName", link: "/pagename", component: <PageName /> },
];
```

Note that in the navbar, the links will appear in order!
