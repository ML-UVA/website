'use client';
import { useState, useEffect } from "react";
import "@/css/parent.css";
import { convertDriveLink } from "@/components/custom/EventTemplate/useEventSheetData";
import { fetchGoogleSheet } from "../actions";

interface TeamItem {
  name: string;
  position: string;
  git: string;
  linkedin: string;
  imgpath: string;
  type: string; // category label from the sheet
}

const SHEET_ID = "1-LeB821N5hDANcH0ZDKEn22jsmpSp3I3SNLSJFkAYR0";
const RANGE = "Sheet1!A:F";

function Team() {
  const [sheetData, setSheetData] = useState<TeamItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchGoogleSheet(SHEET_ID, RANGE);
        const rows: string[][] = responseData.values || [];

        // Skip header and validate rows - require name and position at minimum
        const data: TeamItem[] = rows
          .slice(1)
          .filter((row) => {
            // Filter out rows with missing required fields
            const hasRequiredFields = row[0]?.trim() && row[1]?.trim();
            if (!hasRequiredFields) {
              console.warn("Skipping team member row with missing required fields (name or position):", row);
            }
            return hasRequiredFields;
          })
          .map((row) => ({
            name: row[0]?.trim() || "",
            position: row[1]?.trim() || "",
            git: row[2]?.trim() || "",
            linkedin: row[3]?.trim() || "",
            imgpath: row[4]?.trim() || "",
            type: row[5]?.trim() || "Other",
          }));

        setSheetData(data);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        setSheetData([]); // Set empty array on error
      }
    };

    fetchData();
  }, []);

  // Preserve first-seen order of categories in the sheet
  const categories = Array.from(
    new Set(sheetData.map((i) => (i.type && i.type.trim()) || "Other"))
  );

  return (
    <section className="page-section body" id="team">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Leadership</h2>
          <p>
            Our mission is to make AI at UVA accessible and engaging for every
            student, regardless of background...
          </p>
        </div>

        {categories.map((cat) => {
          const members = sheetData.filter((m) => (m.type || "Other") === cat);
          if (members.length === 0) return null;

          return (
            <div key={cat}>
              <br />
              <hr />
              <br />
              <div className="text-center">
                <h2 className="section-heading text-uppercase">{cat}</h2>
              </div>

              <div className="row mt-5">
                {members.map(({ name, position, git, linkedin, imgpath }) => {
                  const imgSrc = imgpath
                    ? convertDriveLink(imgpath)
                    : "/img/team/default-profile.jpg";

                  return (
                    <div className="col-lg-4" key={name}>
                      <div className="mb-12 text-center">
                        <img
                          className="mx-auto rounded-circle"
                          style={{
                            width: "14rem",
                            height: "14rem",
                            objectFit: "cover",
                            border: "0.5rem solid rgba(0, 0, 0, 0.1)",
                          }}
                          src={imgSrc}
                          alt={name}
                          referrerPolicy="no-referrer"
                        />
                        <h4>{name}</h4>
                        <p className="text-muted">{position}</p>

                        <a
                          className={
                            "btn btn-dark btn-social mx-2 " +
                            (!git && "disabled")
                          }
                          href={git || "#"}
                          aria-label={`${name} Github`}
                          target={git ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-github"></i>
                        </a>

                        <a
                          className={
                            "btn btn-dark btn-social mx-2 " +
                            (!linkedin && "disabled")
                          }
                          href={linkedin || "#"}
                          aria-label={`${name} LinkedIn Profile`}
                          target={linkedin ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Team;
