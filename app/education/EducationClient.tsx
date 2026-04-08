'use client';
import { useState } from 'react';

type Tab = 'lectures' | 'reading-groups' | 'resources';

interface LectureItem { name: string; date: string; year: number; slides: string; video: string; presentor: string; desc: string }
interface ReadingGroupItem { article: string; link: string; presentedBy: string; presentationDate: string }
interface ResourceItem { name: string; description: string; link: string; type: string; tags: string[] }

interface Props {
  lectureRows: string[][];
  readingRows: string[][];
  resourceRows: string[][];
}

const parseYear = (dateStr: string): number => {
  if (!dateStr) return NaN;
  const parts = dateStr.trim().split(/[/-]/);
  const mm = parseInt(parts[0]);
  const yyyy = parseInt(parts[2] ?? '');
  if (!Number.isFinite(yyyy)) return NaN;
  return mm < 8 ? yyyy - 1 : yyyy;
};

export default function EducationClient({ lectureRows, readingRows, resourceRows }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('lectures');
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const lectures: LectureItem[] = lectureRows
    .filter((r) => r[0]?.trim() && r[1]?.trim())
    .map((r) => ({
      name: r[0]?.trim() || '', date: r[1]?.trim() || '',
      year: parseYear(r[1]?.trim() || ''),
      slides: r[2] ? r[2].replace('/pub?', '/embed?') : '',
      video: r[3]?.trim() || '', presentor: r[4]?.trim() || '', desc: r[5]?.trim() || '',
    }));

  const readingGroups: ReadingGroupItem[] = readingRows
    .filter((r) => r[0]?.trim() && r[2]?.trim())
    .map((r) => ({
      article: r[0]?.trim() || '', link: r[1]?.trim() || '#',
      presentedBy: r[2]?.trim() || '', presentationDate: r[3]?.trim() || '',
    }));

  const resources: ResourceItem[] = resourceRows
    .map((r) => ({
      name: r[0] || '', description: r[1] || '', link: r[2] || '',
      type: r[3] || 'Other',
      tags: (r[4] || '').split(',').map((t) => t.trim()).filter(Boolean),
    }))
    .filter((r) => r.name && r.link);

  const distinctYears = Array.from(new Set(lectures.map((l) => l.year).filter(Number.isFinite))).sort((a, b) => b - a);
  const defaultYear = distinctYears[0] ?? new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const currentYear = selectedYear ?? defaultYear;
  const filtered = lectures.filter((l) => l.year === currentYear);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'lectures', label: 'Lectures' },
    { key: 'reading-groups', label: 'Reading Groups' },
    { key: 'resources', label: 'Resources' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Tabs */}
        <div className="flex gap-1 mb-12 border-b border-line">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setExpanded({}); }}
              className={`px-6 py-3 font-heading font-semibold text-sm border-none bg-transparent cursor-pointer transition-all duration-200 border-b-2 -mb-px ${
                activeTab === key
                  ? 'text-navy border-b-navy'
                  : 'text-txt-muted border-b-transparent hover:text-txt'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div key={activeTab}>

          {/* Lectures */}
          {activeTab === 'lectures' && (
            <div>
              <div className="flex justify-between items-start gap-5 mb-10 flex-wrap">
                <div>
                  <h2 className="font-heading font-extrabold text-[2rem] mb-2">Lectures</h2>
                  <p className="text-txt-secondary max-w-[560px] text-sm">Weekly lectures exploring cutting-edge ML concepts and practical applications.</p>
                </div>
                {distinctYears.length > 0 && (
                  <select
                    value={currentYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-4 py-2.5 border border-line rounded-lg font-heading text-sm font-semibold text-txt bg-white cursor-pointer focus:outline-none focus:border-navy"
                  >
                    {distinctYears.map((y) => <option key={y} value={y}>{y}&ndash;{y + 1}</option>)}
                  </select>
                )}
              </div>
              <div className="flex flex-col divide-y divide-line border border-line rounded-xl overflow-hidden">
                {filtered.length > 0 ? filtered.map((lec, idx) => (
                  <div key={idx}>
                    <div
                      className="flex justify-between items-center gap-4 px-6 py-5 cursor-pointer select-none hover:bg-surface-light transition-colors"
                      onClick={() => setExpanded((p) => ({ ...p, [idx]: !p[idx] }))}
                    >
                      <div>
                        <h4 className="font-heading font-semibold text-[1rem] mb-1">{lec.name}</h4>
                        <div className="flex items-center gap-3 flex-wrap">
                          {lec.date && <span className="text-txt-muted text-xs">{lec.date}</span>}
                          {lec.presentor && <span className="text-txt-muted text-xs italic">· {lec.presentor}</span>}
                        </div>
                      </div>
                      <i className={`fas fa-chevron-down text-txt-muted text-xs transition-transform duration-300 shrink-0 ${expanded[idx] ? 'rotate-180' : ''}`} />
                    </div>
                    {expanded[idx] && (
                      <div className="px-6 py-5 border-t border-line bg-surface-light">
                        {lec.desc && <p className="text-txt-secondary text-sm mb-4 leading-relaxed">{lec.desc}</p>}
                        <div className="flex gap-3 flex-wrap">
                          {lec.slides && (
                            <a href={lec.slides} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2 bg-navy text-white font-heading font-semibold text-xs rounded-full hover:bg-ink transition-all no-underline">
                              Slides
                            </a>
                          )}
                          {lec.video && (
                            <a href={lec.video} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2 border border-navy text-navy font-heading font-semibold text-xs rounded-full hover:bg-navy hover:text-white transition-all no-underline">
                              Video
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )) : <p className="text-center text-txt-muted py-12 text-sm italic">No lectures for the selected year.</p>}
              </div>
            </div>
          )}

          {/* Reading Groups */}
          {activeTab === 'reading-groups' && (
            <div>
              <h2 className="font-heading font-extrabold text-[2rem] mb-2">Reading Groups</h2>
              <p className="text-txt-secondary mb-10 max-w-[560px] text-sm">Weekly discussions of significant ML papers. Come prepared with questions!</p>
              {readingGroups.length > 0 ? (
                <div className="overflow-x-auto border border-line rounded-xl">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-line">
                        <th className="bg-surface-light font-heading font-semibold text-txt text-left py-3.5 px-5">Paper</th>
                        <th className="bg-surface-light font-heading font-semibold text-txt text-left py-3.5 px-5">Presenter</th>
                        <th className="bg-surface-light font-heading font-semibold text-txt text-left py-3.5 px-5">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {readingGroups.map((g, i) => (
                        <tr key={i} className="hover:bg-surface-light transition-colors">
                          <td className="py-3.5 px-5 text-txt-secondary">
                            {g.link && g.link !== '#'
                              ? <a href={g.link} target="_blank" rel="noopener noreferrer"
                                  className="text-navy font-medium hover:text-orange transition-colors no-underline">{g.article}</a>
                              : g.article}
                          </td>
                          <td className="py-3.5 px-5 text-txt-secondary">{g.presentedBy}</td>
                          <td className="py-3.5 px-5 text-txt-muted">{g.presentationDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <p className="text-center text-txt-muted py-12 text-sm italic">No reading groups available.</p>}
            </div>
          )}

          {/* Resources */}
          {activeTab === 'resources' && (
            <div>
              <h2 className="font-heading font-extrabold text-[2rem] mb-2">Learning Resources</h2>
              <p className="text-txt-secondary mb-10 max-w-[560px] text-sm">A curated collection of ML learning materials, tutorials, and reference guides.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resources.length > 0 ? resources.map((r, i) => (
                  <a key={i} href={r.link} target="_blank" rel="noopener noreferrer"
                    className="flex flex-col bg-white border border-line rounded-xl p-6 no-underline hover:border-navy hover:shadow-card transition-all duration-200">
                    <h4 className="font-heading font-semibold text-[0.95rem] mb-2">{r.name}</h4>
                    <p className="text-txt-secondary text-xs leading-relaxed mb-4 flex-1">{r.description}</p>
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {r.tags.map((t) => (
                        <span key={t} className="inline-block px-2.5 py-0.5 bg-surface-subtle text-txt-muted rounded-full text-[0.7rem] font-semibold">{t}</span>
                      ))}
                    </div>
                    <span className="text-txt-muted text-[0.65rem] font-semibold tracking-wider uppercase">{r.type}</span>
                  </a>
                )) : <p className="text-center col-span-3 text-txt-muted py-12 text-sm italic">No resources available.</p>}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
