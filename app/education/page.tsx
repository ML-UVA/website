'use client';
import { useState, useEffect } from 'react';
import './Education.css';
import { fetchGoogleSheet } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ActiveTab = 'lectures' | 'reading-groups' | 'resources';

interface LectureItem {
  name: string;
  date: string;
  year: number;
  slides?: string;
  video?: string;
  presentor?: string;
  desc?: string;
}

interface ReadingGroupItem {
  article: string;
  link: string;
  presentedBy: string;
  presentationDate: string;
}

interface ResourceItem {
  name: string;
  description: string;
  link: string;
  type: string;
  tags: string[];
}

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

const typeToIcon = (type: ResourceType) => {
  let src = "";
  if (type == ResourceType.VIDEO) src = "/img/video-solid.svg";
  else if (type == ResourceType.ARTICLE) src = "/img/newspaper-solid.svg";
  else if (type == ResourceType.PAGE) src = "/img/circle-info-solid.svg";
  else src = "/img/file-solid.svg";
  return <img className="resourceIcon" src={src} alt={type} />;
};

const parseYear = (dateStr: string): number => {
  if (!dateStr) return NaN;
  const [mm, , yyyy] = dateStr.trim().split(/[/-]/);
  const y = parseInt((yyyy ?? "").trim(), 10);
  if (parseInt(mm) < 8) {
    return y - 1;
  }
  return Number.isFinite(y) ? y : NaN;
};

const LECTURES_SHEET_ID = "1anBj8NC_n_WC6nwuvCu6uSfZEnri8oJLX9bYGZkDvls";
const READING_SHEET_ID = "1EUv0f17XHatqQHDLIB1EJ3xSY9_vHHIgEd4Hf1UT2lw";
const RESOURCES_SHEET_ID = "1ZH69RftLEFIL7M1TizHYTjWkD2yYyYUpfzJQ0IiBonk";

export default function Education() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lectures');
  const [lectures, setLectures] = useState<LectureItem[]>([]);
  const [lectureYears, setLectureYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [readingGroups, setReadingGroups] = useState<ReadingGroupItem[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [expandedLectures, setExpandedLectures] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const responseData = await fetchGoogleSheet(LECTURES_SHEET_ID, "Sheet1!A:H");
        const rows = responseData.values || [];

        const data: LectureItem[] = rows
          .slice(1)
          .filter((row: string[]) => row[0]?.trim() && row[1]?.trim())
          .map((row: string[]) => {
            const date = row[1]?.trim() || "";
            const year = parseYear(date);
            const slideLink = row[2]
              ? row[2].replace("/pub?", "/embed?")
              : "";

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

        const distinctYears = Array.from(
          new Set(data.map((d) => d.year).filter((y) => Number.isFinite(y)))
        ).sort((a, b) => b - a);

        const defaultYear = distinctYears.includes(new Date().getFullYear())
          ? new Date().getFullYear()
          : distinctYears[0] ?? new Date().getFullYear();

        setLectures(data);
        setLectureYears(distinctYears);
        setSelectedYear(defaultYear);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    const fetchReadingGroups = async () => {
      try {
        const responseData = await fetchGoogleSheet(READING_SHEET_ID, "Sheet1!A:D");
        const rows = responseData.values || [];

        const data: ReadingGroupItem[] = rows
          .slice(1)
          .filter((row: string[]) => row[0]?.trim() && row[2]?.trim())
          .map((row: string[]) => ({
            article: row[0]?.trim() || "",
            link: row[1]?.trim() || "#",
            presentedBy: row[2]?.trim() || "",
            presentationDate: row[3]?.trim() || "",
          }));

        setReadingGroups(data);
      } catch (error) {
        console.error("Error fetching reading groups:", error);
      }
    };

    const fetchResources = async () => {
      try {
        const response = await fetchGoogleSheet(RESOURCES_SHEET_ID, "Sheet1!A:E");
        const rows = response.values || [];

        const resourceItems: ResourceItem[] = rows
          .slice(1)
          .map((row: string[]) => ({
            name: row[0] || "",
            description: row[1] || "",
            link: row[2] || "",
            type: strToType(row[3] || ""),
            tags: (row[4] || "")
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean),
          }))
          .filter((r: ResourceItem) => r.name && r.link);

        setResources(resourceItems);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchLectures();
    fetchReadingGroups();
    fetchResources();
  }, []);

  const filteredLectures = lectures.filter((l) => l.year === selectedYear);

  const toggleLectureExpand = (index: number) => {
    setExpandedLectures((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="education-container">
      <div className="education-header">
        <h1>Education</h1>
        <p>Empowering the next generation of ML practitioners through comprehensive learning resources and community engagement.</p>
      </div>

      <div className="education-tabs">
        <button
          className={`tab-button ${activeTab === 'lectures' ? 'active' : ''}`}
          onClick={() => setActiveTab('lectures')}
        >
          Lectures
        </button>
        <button
          className={`tab-button ${activeTab === 'reading-groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('reading-groups')}
        >
          Reading Groups
        </button>
        <button
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>

      <div className="education-content">
        {activeTab === 'lectures' && (
          <div className="tab-content lectures-section">
            <h2 className="section-heading">Lectures</h2>
            <p className="section-description">
              Join our weekly lectures where we explore cutting-edge machine learning concepts and practical applications.
            </p>

            {lectureYears.length > 0 && (
              <div className="year-selector">
                <label>Select Year:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="year-dropdown"
                >
                  {lectureYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="lectures-list">
              {filteredLectures.length > 0 ? (
                filteredLectures.map((lecture, idx) => (
                  <div key={idx} className="lecture-item">
                    <div
                      className="lecture-header"
                      onClick={() => toggleLectureExpand(idx)}
                    >
                      <h4 className="lecture-title">{lecture.name}</h4>
                      <div className="lecture-meta">
                        <span className="lecture-date">{lecture.date}</span>
                        {lecture.presentor && (
                          <span className="lecture-presenter">by {lecture.presentor}</span>
                        )}
                        <span className="expand-icon">
                          {expandedLectures[idx] ? '▼' : '▶'}
                        </span>
                      </div>
                    </div>
                    {expandedLectures[idx] && (
                      <div className="lecture-content">
                        {lecture.desc && (
                          <p className="lecture-description">{lecture.desc}</p>
                        )}
                        <div className="lecture-links">
                          {lecture.slides && (
                            <a href={lecture.slides} target="_blank" rel="noopener noreferrer" className="lecture-link">
                              View Slides
                            </a>
                          )}
                          {lecture.video && (
                            <a href={lecture.video} target="_blank" rel="noopener noreferrer" className="lecture-link">
                              Watch Video
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-data">No lectures available for the selected year.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reading-groups' && (
          <div className="tab-content reading-groups-section">
            <h2 className="section-heading">Reading Groups</h2>
            <p className="section-description">
              We host a weekly reading group where we discuss fundamental and significant ML papers. Participants are expected to have read the paper and come prepared with questions.
            </p>

            <div className="reading-groups-table">
              {readingGroups.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="tableHeading">Paper</TableHead>
                      <TableHead className="tableHeading">Presenter</TableHead>
                      <TableHead className="tableHeading">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {readingGroups.map((group, index) => (
                      <TableRow key={`${group.article}-${index}`} className="table-row-styles">
                        <TableCell className="font-medium">
                          {group.link && group.link !== "#" ? (
                            <a href={group.link} target="_blank" rel="noopener noreferrer" className="paper-link">
                              {group.article}
                            </a>
                          ) : (
                            group.article
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{group.presentedBy}</TableCell>
                        <TableCell className="font-medium">{group.presentationDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="no-data">No reading groups available.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="tab-content resources-section">
            <h2 className="section-heading">Learning Resources</h2>
            <p className="section-description">
              Explore our curated collection of ML learning materials, tutorials, and reference guides.
            </p>

            <div className="resources-grid">
              {resources.length > 0 ? (
                resources.map((resource, idx) => (
                  <a
                    key={`${resource.name}-${idx}`}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card"
                  >
                    <div className="resource-icon">
                      {typeToIcon(resource.type as unknown as ResourceType)}
                    </div>
                    <h4 className="resource-title">{resource.name}</h4>
                    <p className="resource-description">{resource.description}</p>
                    <div className="resource-tags">
                      {resource.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))
              ) : (
                <p className="no-data">Loading resources...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
