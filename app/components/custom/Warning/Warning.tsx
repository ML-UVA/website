import { useState, useEffect } from "react";
import "./Warning.css";
import { fetchGoogleSheet } from "@/actions";

const SHEET_ID = "1pm81wViCBjDaX1G01TQRrJ9zkA6K3DTEaYqCauxUUkE"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A:D"; // Adjust the range as per your sheet

interface WarningItem {
  title: string;
  message: string;
  link: string;
  link_name: string;
}

function Warning() {
  const [sheetData, setSheetData] = useState<WarningItem>({
    title: "",
    message: "",
    link: "",
    link_name: "",
  });
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    const isPopoverClosed = localStorage.getItem("isPopoverClosed");
    const popoverTitle = localStorage.getItem("popoverTitle");

    const fetchData = async () => {
      try {
        const responseData = await fetchGoogleSheet(SHEET_ID, RANGE);
        const rows: string[][] = responseData.values || [];
        
        // Validate and filter rows - require title and message at minimum
        const data: WarningItem[] = rows
          .slice(1)
          .filter((row) => {
            // Filter out rows with missing required fields
            const hasRequiredFields = row[0]?.trim() && row[1]?.trim();
            if (!hasRequiredFields) {
              console.warn("Skipping warning row with missing required fields (title or message):", row);
            }
            return hasRequiredFields;
          })
          .map((row) => {
            return {
              title: row[0]?.trim() || "",
              message: row[1]?.trim() || "",
              link: row[2]?.trim() || "",
              link_name: row[3]?.trim() || "",
            };
          });
        
        if (data.length > 0) {
          const popoverItem = data[data.length - 1];
          setSheetData(popoverItem);

          if (popoverItem.title != popoverTitle || isPopoverClosed !== "true") {
            setShowPopover(true);
            localStorage.setItem("popoverTitle", popoverItem.title);
            localStorage.setItem("isPopoverClosed", "false");
          }
        }
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };
    fetchData();
  }, []);

  const handleClosePopover = () => {
    setShowPopover(false);
    localStorage.setItem("isPopoverClosed", "true");
  };

  if (!showPopover || !sheetData) return <div />;

  return (
    <div className="warning-overlay">
      <div className="popover-window">
        <div className="popover-content alert alert-success" role="alert">
          <button className="close-button" onClick={handleClosePopover}>
            &times;
          </button>
          <h4 className="alert-heading">{sheetData.title}</h4>
          <p>{sheetData.message}</p>
          <hr />
          <p className="mb-0">
            <a href={sheetData.link}>{sheetData.link_name}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Warning;
