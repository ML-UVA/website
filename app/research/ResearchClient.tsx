'use client';

interface Project {
  projName: string; group: string; clientLink: string; link: string;
  img_link: string; tags: string[]; summary: string; recruiting: boolean;
}

export default function ResearchClient({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-txt-muted">
        <i className="fas fa-flask text-4xl mb-4 block opacity-40" />
        <p>Research projects to be announced!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {projects.map((p) => (
        <div key={`${p.projName}-${p.group}`}
          className="flex flex-col bg-white border border-line rounded-2xl overflow-hidden hover:translate-y-[-4px] hover:shadow-hover transition-all">
          {/* Image */}
          <div className="h-[200px] flex items-center justify-center p-6 bg-surface-light border-b border-line">
            {p.img_link ? (
              <img src={p.img_link} alt={`${p.group || p.projName} logo`}
                className="max-h-[160px] max-w-full object-contain" referrerPolicy="no-referrer" />
            ) : (
              <span className="font-heading font-extrabold text-2xl text-navy text-center">{p.group || p.projName}</span>
            )}
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-[1.15rem] mb-3">{p.projName}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {p.recruiting && (
                <span className="inline-block px-3.5 py-1 rounded-full text-[0.82rem] font-semibold font-heading bg-green-50 text-green-700">
                  Recruiting
                </span>
              )}
              {p.tags.map((t, i) => (
                <span key={i} className="inline-block px-3.5 py-1 bg-surface-subtle text-brand-cyan rounded-full text-[0.82rem] font-semibold font-heading">{t}</span>
              ))}
            </div>
            {p.summary && <p className="text-txt-secondary text-[0.92rem] leading-relaxed flex-1 mb-4">{p.summary}</p>}
            <div className="flex gap-2.5 flex-wrap mt-auto">
              {p.clientLink && (
                <a href={p.clientLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-brand-cyan text-brand-cyan font-heading font-semibold text-[0.85rem] rounded-md hover:bg-brand-cyan hover:text-white transition-all no-underline">
                  <i className="fas fa-external-link-alt" /> GitHub
                </a>
              )}
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-cyan text-white font-heading font-semibold text-[0.85rem] rounded-md hover:bg-navy transition-all no-underline">
                  Learn More <i className="fas fa-arrow-right" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
