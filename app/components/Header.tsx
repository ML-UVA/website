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

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
          solid
            ? 'bg-white/[0.97] backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)] py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center no-underline relative z-10">
            <img
              src="/icon.svg"
              alt="ML@UVA"
              className={`transition-all duration-300 ${solid ? 'h-11' : 'h-14'}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map(({ name, link }) => {
              const isActive = pathname === link;
              return (
                <Link
                  key={link}
                  href={link}
                  className={`font-heading text-sm font-semibold tracking-wide no-underline px-3.5 py-2 transition-colors duration-200 ${
                    isActive ? 'text-orange' : 'text-txt-secondary hover:text-txt'
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5 relative z-10"
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
        </div>
      </header>

      {/* Mobile Nav Overlay — outside <header> so backdrop-blur filter doesn't trap fixed positioning */}
      <div
        className={`fixed inset-0 z-[99] md:hidden bg-white transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col pt-24 px-8 gap-1">
          {navItems.map(({ name, link }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={link}
                href={link}
                className={`font-heading text-[1.4rem] font-semibold tracking-tight no-underline py-3.5 border-b border-line transition-colors duration-200 ${
                  isActive ? 'text-orange' : 'text-txt hover:text-txt-secondary'
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
