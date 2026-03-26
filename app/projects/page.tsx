'use client';
import { useState, useEffect } from "react";
import "./Projects.css"; // <-- ensure this is imported
import { fetchGoogleSheet } from "@/actions";
// import { api } from "@/lib/api";

// const GCLOUD_API_KEY = await api.search("VITE_GCLOUD_API_KEY");
const discord_link = process.env.NEXT_PUBLIC_DISCORD_INVITE;

interface ProjectItem {
  projName: string;
  group: string;
  clientLink: string;
  link: string;
  img_link: string;
  tags: string[];
  summary: string;
  recruiting: boolean;
}

export function convertDriveLink(link: string): string {
  if (link === "") return "";
  const startString = "/d/";
  const endString = "/";
  const startPosition = link.indexOf(startString) + startString.length;
  const endPosition = link.lastIndexOf(endString);
  const ret =
    "https://lh3.googleusercontent.com/d/" +
    link.substring(startPosition, endPosition);
  return ret;
}

const SHEET_ID = "1uUiExx5mOYZvD8GdKYwIqttYi828coBvUnnEHhvOHaA";
const RANGE = "Sheet1!A:G"; // include tags in column H

const openNew = (url: string) => {
  if (!url || url === "#") return;
  window.open(url, "_blank", "noopener,noreferrer");
};

function Projects() {
  const [sheetData, setSheetData] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await fetchGoogleSheet(SHEET_ID, RANGE);
        const rows: string[][] = dataResponse.values || [];

        // Validate and filter rows - require project name and group at minimum
        const data: ProjectItem[] = rows
          .slice(1)
          .filter((row) => {
            // Filter out rows with missing required fields
            const hasRequiredFields = row[0]?.trim() && row[1]?.trim();
            if (!hasRequiredFields) {
              console.warn("Skipping row with missing required fields (projName or group):", row);
            }
            return hasRequiredFields;
          })
          .map((row) => {
            const projName = row[0]?.trim() || "";
            const group = row[1]?.trim() || "";
            const clientLink = row[2]?.trim() || "";
            const link = row[3]?.trim() || "";
            const recruitingStr = (row[4] || "").toLowerCase().trim();
            const recruiting =
              recruitingStr === "true" ||
              recruitingStr === "yes" ||
              recruitingStr === "1";
            const img_link = convertDriveLink(row[5] || "");
            const rawTags = row[6] || "";
            const tags = rawTags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
            const summary = row[7]?.trim() || "";

            return {
              projName,
              group,
              clientLink,
              link,
              img_link,
              tags,
              summary,
              recruiting, // <-- boolean
            };
          });

        // Sort so recruiting projects appear first
        const sortedData = data.sort((a, b) =>
          a.recruiting === b.recruiting ? 0 : a.recruiting ? -1 : 1
        );

        setSheetData(sortedData);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        setSheetData([]); // Set empty array on error
      }
    };

    fetchData();
  }, []);

  console.log(sheetData);
  // Keep your subtle brighten on hover
  const softHover = "transition hover:brightness-95";
  const redCard = "border border-danger bg-red-50 hover:bg-red-100";
  const neutralCard = "border bg-white hover:bg-slate-50";

  return (
    <section id="projects" className="body page-section">
      <div className="container">
        <div className="row">
          <div className="text-center mb-4">
            <h2 className="section-heading text-uppercase">Projects</h2>
            <p>
              Our projects offer members hands-on experience bridging research
              and real-world ML. <br />
              Interested in joining? All application forms will be posted on our{" "}
              <a href={discord_link} target="_blank">
                Discord
              </a>
              .
            </p>
          </div>
        </div>

        <div className="row">
          {sheetData.length ? (
            sheetData.map((item) => {
              const {
                projName,
                group,
                img_link,
                tags,
                recruiting,
                clientLink,
                link,
              } = item;

              return (
                <div
                  key={`${projName}-${group}`}
                  className="col-12 col-md-6 col-lg-4 mb-4"
                >
                  <div
                    className={`card h-100 shadow-sm position-relative cursor-pointer p-1 hover-reveal ${softHover} ${
                      recruiting ? neutralCard : redCard
                    }`}
                  >
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center p-4"
                      style={{ height: 250 }}
                    >
                      {img_link ? (
                        <img
                          src={img_link}
                          alt={`${group || projName} logo`}
                          className="img-fluid"
                          style={{ maxHeight: 300, objectFit: "contain" }}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                          <span className="fw-bold display-6 text-center">
                            {group || projName}
                          </span>
                        </div>
                      )}
                    </div>

                    <hr className="m-0" />

                    <div className="card-footer bg-transparent border-0 mt-3 mb-0 p-0 text-center">
                      <h5 className="fw-light">{projName}</h5>

                      <div className="mt-2 d-flex flex-wrap gap-2 justify-content-center">
                        <span
                          className={`badge rounded-pill ${
                            recruiting ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {recruiting ? "Recruiting" : "Not Recruiting"}
                        </span>

                        {tags &&
                          tags.map((t, i) => (
                            <span
                              key={`${projName}-tag-${i}`}
                              className="badge rounded-pill text-bg-secondary"
                            >
                              {t}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="text-muted small">{item.summary}</p>
                    </div>

                    <div
                      className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-2 px-4 py-3"
                      style={{
                        backgroundColor: recruiting
                          ? "rgba(25, 135, 84, 0.85)" // green
                          : "rgba(220, 53, 69, 0.85)", // red
                        zIndex: 5,
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-light w-100"
                        onClick={() => openNew(clientLink)}
                      >
                        Visit Client
                      </button>
                      <button
                        type="button"
                        className="btn btn-light w-100"
                        onClick={() => openNew(link)}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">
              <em>Projects to be announced!</em>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
