import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Lectures.css";
import "@/css/parent.css";
// import { api } from "@/lib/api";

// const GCLOUD_API_KEY = await api.search("VITE_GCLOUD_API_KEY");
const GCLOUD_API_KEY = import.meta.env.VITE_GCLOUD_API_KEY;

interface LectureItem {
  name: string;
  date: string; // "DD/MM/YYYY"
  year: number; // <-- add a derived year field
  slides?: string;
  video?: string;
  presentor?: string;
  desc?: string;
}

const SHEET_ID = "1anBj8NC_n_WC6nwuvCu6uSfZEnri8oJLX9bYGZkDvls";
const RANGE = "Sheet1!A:H";

function Lectures() {
  const [selectedLink, setSelectedLink] = useState(
    "https://docs.google.com/presentation/d/1a6hi5I6sdje_88IROMeryYxr5uA7OJZ28evZ4a4ejZU/embed?"
  );
  const [loading, setLoading] = useState(true);
  const [sheetData, setSheetData] = useState<LectureItem[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [expandedIndexes, setExpandedIndexes] = useState<{
    [key: number]: boolean;
  }>({});
  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const parseYear = (dateStr: string): number => {
    if (!dateStr) return NaN;
    const [mm, , yyyy] = dateStr.trim().split(/[/-]/);
    const y = parseInt((yyyy ?? "").trim(), 10);
    if (parseInt(mm) < 8) {
      return y - 1;
    }
    return Number.isFinite(y) ? y : NaN;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${GCLOUD_API_KEY}`;
        const response = await axios.get(api_url);
        const rows: string[][] = response.data.values || [];

        // assume first row is header -> skip it
        // Validate and filter rows - require name and date at minimum
        const data: LectureItem[] = rows
          .slice(1)
          .filter((row) => {
            // Filter out rows with missing required fields
            const hasRequiredFields = row[0]?.trim() && row[1]?.trim();
            if (!hasRequiredFields) {
              console.warn("Skipping lecture row with missing required fields (name or date):", row);
            }
            return hasRequiredFields;
          })
          .map((row) => {
            const rawSlides = row[2] || "";
            const slideLink = rawSlides
              ? rawSlides.replace("/pub?", "/embed?")
              : "";
            const date = row[1]?.trim() || "";
            const year = parseYear(date);

            return {
              name: row[0]?.trim() || "",
              date,
              year,
              slides: slideLink,
              video: row[3]?.trim() || "",
              presentor: row[4]?.trim() || "",
              desc: row[5]?.trim() || "",
            };
          });

        // collect distinct years present in the sheet
        const distinctYears = Array.from(
          new Set(data.map((d) => d.year).filter((y) => Number.isFinite(y)))
        ).sort((a, b) => b - a);

        // if current year is not in data, default to the most recent available
        const defaultYear = distinctYears.includes(new Date().getFullYear())
          ? new Date().getFullYear()
          : distinctYears[0] ?? new Date().getFullYear();

        setSheetData(data);
        setYears(distinctYears);
        setSelectedYear(defaultYear);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            console.error("API key is invalid or Google Sheets API is not enabled");
          } else if (error.response?.status === 404) {
            console.error("Sheet ID is incorrect or sheet not found");
          }
        }
        setSheetData([]); // Set empty array on error
        setYears([]);
      }
    };

    fetchData();
  }, []);

  const handleIframeLoad = () => setLoading(false);

  const toggleParagraph = (index: number) => {
    setExpandedIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // filter by selected year
  const filtered = sheetData.filter((item) => item.year === selectedYear);

  return (
    <div className="body">
      <section className="page-section" id="lectures">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Lectures</h2>
            <p>
              Whether you're just starting out or looking to deepen your
              understanding, our lectures are designed for learners at all
              levels. Some lectures build on previous ones, so feel free to
              progress at your own pace. If you have any questions, don’t
              hesitate to reach out to our officers on Discord.
            </p>

            {/* Year selector */}
            {years.length > 0 && (
              <div className="mt-3 d-flex justify-content-center align-items-center">
                <label
                  htmlFor="yearSelect"
                  className="form-label me-2 mb-0 fw-bold"
                >
                  Year:
                </label>
                <select
                  id="yearSelect"
                  className="form-select w-auto"
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYear(parseInt(e.target.value, 10))
                  }
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y} - {y + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 margin-bottom-md">
              {loading && (
                <div className="partial-loading">
                  <div className="spinner"></div>
                </div>
              )}
              <iframe
                src={selectedLink}
                width="100%"
                height="480"
                allowFullScreen
                title="Google Slides"
                onLoad={handleIframeLoad}
                style={{
                  display: loading ? "none" : "block",
                }}
              />
            </div>
            <div className="col-lg-6 mt-4 lectures-list">
              <ul>
                {filtered.map(
                  (
                    {
                      name,
                      date,
                      slides = "",
                      video = "",
                      presentor = "",
                      desc = "",
                    },
                    idx
                  ) => (
                    <li key={`${name}-${date}-${idx}`}>
                      <button
                        className={`lecture-button ${!slides && "disabled"}`}
                        onClick={() => {
                          if (slides && selectedLink !== slides) {
                            setLoading(true);
                            setSelectedLink(slides);
                          }
                          toggleParagraph(idx);
                        }}
                      >
                        <div className="lecture-heading">
                          <h4 className="mainheading">{name}</h4>
                        </div>
                      </button>
                      <h4 className="subheading">
                        {date} {presentor && "| " + presentor}
                      </h4>
                      <div>
                        {slides && (
                          <a
                            href={slides}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-solid fa-up-right-from-square"></i>{" "}
                          </a>
                        )}
                        {video && (
                          <a
                            href={video}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-solid fa-video"></i>
                          </a>
                        )}
                      </div>

                      {desc ? (
                        <div
                          ref={(el) => (refs.current[idx] = el)}
                          className={`lecture-details ${
                            expandedIndexes[idx] ? "expanded" : ""
                          }`}
                        >
                          <p>{desc}</p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Lectures;
