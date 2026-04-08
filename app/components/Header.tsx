'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { name: 'About', link: '/about' },
  { name: 'Education', link: '/education' },
  { name: 'Research', link: '/research' },
  { name: 'Events', link: '/events' },
  { name: 'Partnerships', link: '/partnerships' },
  { name: 'Team', link: '/teams' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/[0.97] backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center z-[1001] no-underline">
          <img
            src="/icon.svg"
            alt="ML@UVA"
            className={`transition-all duration-300 ${solid ? 'h-11' : 'h-14'}`}
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5 z-[1001]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className="block w-6 h-0.5 rounded-sm bg-txt transition-all duration-300"
            style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : undefined}
          />
          <span
            className="block w-6 h-0.5 rounded-sm bg-txt transition-all duration-300"
            style={mobileOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block w-6 h-0.5 rounded-sm bg-txt transition-all duration-300"
            style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : undefined}
          />
        </button>

        {/* Nav */}
        <nav
          className={`
            md:flex md:items-center md:gap-1.5 md:static md:bg-transparent md:opacity-100 md:pointer-events-auto md:flex-row
            ${
              mobileOpen
                ? 'fixed inset-0 bg-white/[0.98] backdrop-blur-xl flex flex-col items-center justify-center gap-2 opacity-100 pointer-events-auto px-6'
                : 'fixed inset-0 opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'
            }
            transition-opacity duration-300
          `}
        >
          {navItems.map(({ name, link }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={link}
                href={link}
                className={`
                  font-heading text-sm font-semibold tracking-wide no-underline px-3.5 py-2 transition-colors duration-200
                  ${mobileOpen
                    ? `text-txt text-lg py-3.5 px-6 w-full text-center ${isActive ? 'text-orange' : 'hover:text-txt-secondary'}`
                    : `${isActive ? 'text-orange' : 'text-txt-secondary hover:text-txt'}`
                  }
                `}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
