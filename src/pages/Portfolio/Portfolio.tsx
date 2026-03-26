import { useState, useEffect } from "react";
import axios from "axios";

// import { api } from "@/lib/api";

// const GCLOUD_API_KEY = await api.search("VITE_GCLOUD_API_KEY");
const GCLOUD_API_KEY = import.meta.env.VITE_GCLOUD_API_KEY;

// Helper function to convert Google Drive link to a direct image link
function convertDriveLink(link: string): string {
  if (!link || !link.includes("/d/"))
    return "https://via.placeholder.com/500x300";
  const startString = "/d/";
  const endString = "/";
  const startPosition = link.indexOf(startString) + startString.length;
  const endPosition = link.lastIndexOf(endString);
  if (endPosition <= startPosition)
    return "https://via.placeholder.com/500x300";
  const fileId = link.substring(startPosition, endPosition);
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

// Interface for a single project item from the sheet
interface ProjectItem {
  title: string;
  client: string;
  clientLink: string;
  detailsLink: string;
  imageUrl: string;
  tags: string[];
  description: string;
}

// Interface for projects grouped by client
interface GroupedProjects {
  [key: string]: ProjectItem[];
}

// // Mapping from client key to a display-friendly name
// const categoryDisplayNames: { [key: string]: string } = {
//   lmi: "Work done for LMI",
//   uva: "Work done for UVA",
//   john_hopkins: "Work done for Johns Hopkins APL",
//   // Add other mappings here as needed
// };

const Portfolio = () => {
  const [groupedProjects, setGroupedProjects] = useState<GroupedProjects>({});

  useEffect(() => {
    const fetchData = async () => {
      // --- UPDATED SHEET ID ---
      const SHEET_ID = "1gCtD7nHUzQ-O5ZNmOPQ6g2F7lUdNXSHSegktwhsLRbE";
      const RANGE = "Sheet1!A:H";

      if (!GCLOUD_API_KEY) {
        console.error(
          "VITE_GCLOUD_API_KEY is not defined in your environment variables."
        );
        return;
      }

      try {
        const api_url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${GCLOUD_API_KEY}`;
        const response = await axios.get(api_url);

        const rows: string[][] = response.data.values || [];

        // Validate and filter rows - require title at minimum
        const projects: ProjectItem[] = rows
          .slice(1)
          .filter((row) => {
            // Filter out rows with missing required fields
            const hasRequiredFields = row[0]?.trim();
            if (!hasRequiredFields) {
              console.warn("Skipping portfolio row with missing required field (title):", row);
            }
            return hasRequiredFields;
          })
          .map((row) => ({
            title: row[0]?.trim() || "Untitled Project",
            client: row[1]?.trim() || "other",
            clientLink: row[2]?.trim() || "#",
            detailsLink: row[3]?.trim() || "#",
            imageUrl: convertDriveLink(row[4] || ""),
            tags: (row[5] || "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
            description: row[6]?.trim() || "No description available.",
          }));

        const groups: GroupedProjects = projects.reduce((acc, project) => {
          const key = project.client;
          if (!acc[key]) acc[key] = [];
          acc[key].push(project);
          return acc;
        }, {} as GroupedProjects);

        setGroupedProjects(groups);
      } catch (error) {
        console.error("--- Error fetching data from Google Sheets ---");
        if (axios.isAxiosError(error) && error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
          if (error.response.status === 403) {
            console.error(
              "Authentication Error (403): This often means the API key is invalid or the Google Sheets API is not enabled in your Google Cloud project."
            );
          } else if (error.response.status === 404) {
            console.error(
              "Not Found Error (404): This often means the SHEET_ID is incorrect."
            );
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
        setGroupedProjects({}); // Set empty object on error
      }
    };

    fetchData();
  }, []);

  // Function to truncate the description
  const maxDescrChars = 350;
  const truncateDescription = (text: string, charLimit: number) => {
    if (!text) return "";
    if (text.length <= charLimit) {
      return text;
    }
    return text.slice(0, charLimit).trimEnd() + "...";
  };

  return (
    <>
      <style>{`
          .portfolio-header { padding: 2rem; border-radius: .3rem; text-align: center; }
          .category-separator { margin-top: 3rem; margin-bottom: 2rem; }
          .category-title { text-align: center; margin-bottom: 2rem; }
          .project-section { padding: 4rem 0}
          .project-section-accent { background-color: #f8f9fa; }
          .project-description { margin-bottom: 1.5rem; }

          /* --- NEW CUSTOM STYLES --- */
          .image-container-centered {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
          .portfolio-button {
            background-color: #212529 !important; /* !important to override other styles */
            color: #ffffff !important;
            border-color: #212529 !important;
            text-decoration: none; /* remove underline from link */
            padding: .375rem .75rem; /* Re-add bootstrap padding */
            border-radius: .25rem; /* Re-add bootstrap border-radius */
            transition: background-color 0.15s ease-in-out;
          }
          .portfolio-button:hover {
            background-color: #495057 !important;
            color: #ffffff !important;
          }

      `}</style>
      <div className="container">
        <div className="portfolio-header">
          <h1>Portfolio</h1>
          <p className="lead">
            At Machine Learning @ UVA, we turn ideas into applied intelligence.
            Our AI Consulting branch brings together some of UVA’s most capable
            student engineers and data scientists to deliver real-world machine
            learning solutions — from predictive modeling and data analytics to
            NLP, computer vision, and decision intelligence.
            <br />
            <br />
            Through partnerships with organizations like Adobe, LMI, and 2nd
            Order Solutions, our teams have developed scalable prototypes,
            actionable insights, and industry-grade models. This portfolio
            highlights selected projects that showcase our technical depth,
            collaborative approach, and commitment to accessible, high-impact
            AI.
            <br />
            <br />
            Interested in working with us? Reachout at{" "}
            <a href="contact-ml@virginia.edu" target="_blank">
              contact-ml@virginia.edu
            </a>
          </p>
        </div>

        <hr></hr>

        {Object.entries(groupedProjects).map(
          ([client, projects], clientIndex) => {
            // Use the first project's image as the logo
            const clientLogo =
              projects[0]?.imageUrl || "https://via.placeholder.com/200x100";

            // Alternate layout: even = logo left, odd = logo right
            const isEven = clientIndex % 2 === 0;

            return (
              <div
                key={client}
                className={`client-carousel-section d-flex align-items-center flex-column flex-md-${
                  isEven ? "row" : "row-reverse"
                }`}
              >
                {/* --- Logo Side --- */}
                <div className="client-logo-container text-center flex-shrink-0">
                  <div className="client-logo-container text-center p-3 flex-shrink-0">
                    <img
                      src={clientLogo}
                      alt={`${client} logo`}
                      className="client-logo"
                      style={{
                        width: "400px",
                        objectFit: "contain",
                        objectPosition: "center",
                        borderRadius: "6px",
                        backgroundColor: "white",
                        padding: "4px",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                </div>

                {/* --- Carousel Side --- */}
                <div
                  className="flex-grow-1 d-flex align-items-center justify-content-center position-relative project-section-accent px-3 my-3"
                  style={{ gap: "1rem" }}
                >
                  {/* Left (Previous) Button */}
                  <button
                    className="btn btn-light border"
                    type="button"
                    data-bs-target={`#carousel-${client}`}
                    data-bs-slide="prev"
                    style={{
                      height: "45px",
                      width: "45px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                      style={{
                        filter: "invert(100%) grayscale(100%) brightness(0)",
                      }}
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>

                  {/* Carousel Content */}
                  <div
                    id={`carousel-${client}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{
                      width: "95%", // ⬅️ wider carousel
                      margin: "0 auto",
                    }}
                  >
                    <div className="carousel-inner">
                      {projects.map((project, index) => (
                        <div key={project.title}>
                          <div
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                          >
                            <div className="project-section  p-4 rounded-3 shadow-sm">
                              <div className="row align-items-center">
                                <div className="col-md-12">
                                  <h3>{project.title}</h3>
                                  <p className="project-description">
                                    {truncateDescription(
                                      project.description,
                                      maxDescrChars
                                    )}
                                  </p>
                                  <a
                                    href={project.detailsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-button"
                                  >
                                    Learn More
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right (Next) Button */}
                  <button
                    className="btn btn-light border"
                    type="button"
                    data-bs-target={`#carousel-${client}`}
                    data-bs-slide="next"
                    style={{
                      margin: 0,
                      height: "45px",
                      width: "45px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                      style={{
                        filter: "invert(100%) grayscale(100%) brightness(0)",
                      }}
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Portfolio;
