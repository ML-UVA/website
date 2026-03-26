'use client';
import { useState, useEffect } from "react";
import "@/css/parent.css";
import Link from "next/link";
import "./Resources.css";
import { Button } from "react-bootstrap";
import { fetchGoogleSheet } from "@/actions";
// import { api } from "@/lib/api";

// const GCLOUD_API_KEY = await api.search("VITE_GCLOUD_API_KEY");

// const SHEET_ID = "13lssHnnBpmTLnx6HP5R5n3RAp3YqUl-NLFh6DzKBzX0"; //test spreadsheet
const SHEET_ID = "1ZH69RftLEFIL7M1TizHYTjWkD2yYyYUpfzJQ0IiBonk"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A:E"; // Adjust the range as per your sheet

enum ResourceType {
  VIDEO = "Video",
  ARTICLE = "Article",
  PAGE = "Page",
  OTHER = "Other",
}
const strToType = (s: string) => {
  if (s == "Video") return ResourceType.VIDEO;
  if (s == "Article") return ResourceType.ARTICLE;
  if (s == "Page") return ResourceType.PAGE;
  else return ResourceType.OTHER;
};
const typeToIcon: (type: ResourceType) => React.ReactNode = (type) => {
  let src = "";
  if (type == ResourceType.VIDEO)
    src = "/img/video-solid.svg"; //"//img/video-solid.svg"
  else if (type == ResourceType.ARTICLE) src = "/img/newspaper-solid.svg";
  else if (type == ResourceType.PAGE) src = "/img/circle-info-solid.svg";
  else src = "/img/file-solid.svg";
  return <img className="resourceIcon" src={src}></img>;
};
const getElementFromResource: (
  res: ResourceItem,
  idx: number
) => React.ReactNode = ({ name, description = "", link, type, tags }, idx) => {
  return (
    <div key={`${name}-${link}-${idx}`} className="col-lg-4 col-sm-12 d-flex align-content-center mb-3">
      <div className="resourceCard">
        <Link target="_blank" href={link} className="resourceLink">
          <div className="resourceContent">
            <div className="iconAndTitle align-middle">
              {typeToIcon(type)}
              <h4 className="resourceTitle">{name}</h4>
            </div>
            <div className="tagsContainer">
              {tags.map((t) => (
                <span key={t} className="tagIndicator">
                  {t}
                </span>
              ))}
            </div>
            <p className="resourceDescription">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const getSelectedResources: (
  selectedTypeS: string,
  selectedTags: string[],
  sheetData: ResourceItem[]
) => ResourceItem[] = (selectedTypeS, selectedTags, sheetData) => {
  let selectedResources: ResourceItem[] = sheetData;
  if (selectedTypeS != "") {
    const selectedType = strToType(selectedTypeS);
    selectedResources = selectedResources.filter((r) => r.type == selectedType);
  }
  if (selectedTags.length > 0) {
    selectedResources = selectedResources.filter(
      (r) => selectedTags.filter((t) => r.tags.includes(t)).length > 0
    );
  }
  return selectedResources;
};
interface ResourceItem {
  name: string;
  description?: string;
  link: string;
  type: ResourceType;
  tags: string[];
}

function Resources() {
  //   const [selectedLink, setSelectedLink] = useState(
  //     "https://docs.google.com/presentation/d/e/2PACX-1vRcilu3OWwSpi40wfT3jrj4FiNZq3JYoDK6L1ewQScoT56b0RA8fIxM7wH_1tUZwbubfgBOP2HNWgol/embed?start=false&loop=false&delayms=3000"
  //   );
  const [selectedTypeS, setSelectedTypeS] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sheetData, setSheetData] = useState<ResourceItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await fetchGoogleSheet(SHEET_ID, RANGE);
        const rows: string[][] = dataResponse.values || [];
        
        // Validate and filter rows - require name, link, and type at minimum
        const data: ResourceItem[] = rows
          .slice(1)
          .filter((row) => {
            // Filter out rows with missing required fields or completely empty rows
            const hasRequiredFields = row[0]?.trim() && row[2]?.trim() && row[3]?.trim();
            if (!hasRequiredFields) {
              console.warn("Skipping resource row with missing required fields (name, link, or type):", row);
            }
            return hasRequiredFields;
          })
          .map((row) => {
            const description = row[1]?.trim() || "";
            const tagsStr = row[4]?.trim() || "";
            const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];
            
            return {
              name: row[0]?.trim() || "",
              description: description,
              link: row[2]?.trim() || "",
              type: strToType(row[3]?.trim() || ""),
              tags: tags,
            };
          });
        setSheetData(data);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        setSheetData([]); // Set empty array on error
      }
    };

    fetchData();
  }, []);
  return (
    <div className="body">
      <section className="page-section" id="lectures">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Resources</h2>
            <p>Resources for you to use</p>
          </div>
          <div className="d-flex justify-content-center">
            <div className="filterSelector text-center">
              <h5>Resource</h5>
              {[...new Set(sheetData.map((r) => r.type))].map((s) => (
                <Button
                  key={s}
                  className="typeButton"
                  variant={selectedTypeS == s ? "success" : "outline-success"}
                  onClick={() => {
                    if (selectedTypeS == s) setSelectedTypeS("");
                    else setSelectedTypeS(s);
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
            <div className="filterSelector text-center">
              <h5>Topics</h5>
              {[...new Set(sheetData.map((r) => r.tags).flat())].map((s) => (
                <Button
                  key={s}
                  className="tagButton"
                  variant={selectedTags.includes(s) ? "info" : "outline-info"}
                  onClick={() => {
                    if (selectedTags.includes(s))
                      setSelectedTags(selectedTags.filter((tag) => tag != s));
                    else setSelectedTags(selectedTags.concat([s]));
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <div className="resourcesContainer row justify-content-center">
              {getSelectedResources(selectedTypeS, selectedTags, sheetData).map(
                getElementFromResource
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resources;
