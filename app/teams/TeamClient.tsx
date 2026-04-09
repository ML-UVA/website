'use client';
import Icon from '@/components/Icon';

interface Member {
  name: string; position: string; git: string; linkedin: string; imgSrc: string; type: string;
}

export default function TeamClient({ members }: { members: Member[] }) {
  const categories = Array.from(new Set(members.map((m) => m.type)));

  if (members.length === 0) {
    return <div className="flex items-center justify-center min-h-[40vh]"><div className="w-12 h-12 rounded-full border-[3px] border-line border-t-brand-cyan animate-spin" /></div>;
  }

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {categories.map((cat) => {
          const group = members.filter((m) => m.type === cat);
          if (group.length === 0) return null;
          return (
            <div key={cat} className="mb-16 last:mb-0">
              <h2 className="text-center mb-4 pb-4 border-b-2 border-line">{cat}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-9 mt-9">
                {group.map(({ name, position, git, linkedin, imgSrc }) => (
                  <div key={name} className="group text-center">
                    <div className="w-[160px] h-[160px] mx-auto mb-4 rounded-full overflow-hidden border-4 border-line group-hover:border-brand-cyan group-hover:translate-y-[-4px] transition-all max-sm:w-[120px] max-sm:h-[120px]">
                      <img src={imgSrc} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="text-[1.1rem] mb-1">{name}</h4>
                    <p className="text-txt-muted text-sm mb-3">{position}</p>
                    <div className="flex justify-center gap-2">
                      {git && (
                        <a href={git} target="_blank" rel="noopener noreferrer" aria-label={`${name} GitHub`}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-line text-txt-secondary hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/[0.08] transition-all no-underline">
                          <Icon name="github" className="w-4 h-4" />
                        </a>
                      )}
                      {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} LinkedIn`}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-line text-txt-secondary hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/[0.08] transition-all no-underline">
                          <Icon name="linkedin" className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
