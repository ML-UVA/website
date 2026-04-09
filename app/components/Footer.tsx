'use client';
import Link from 'next/link';
import { SITE_LINKS } from '@/lib/constants';
import Icon from '@/components/Icon';

const footerNav = [
  { name: 'About', link: '/about' },
  { name: 'Education', link: '/education' },
  { name: 'Research', link: '/research' },
  { name: 'Events', link: '/events' },
  { name: 'Partnerships', link: '/partnerships' },
];

const socials = [
  { href: SITE_LINKS.discord, icon: 'discord', label: 'Discord' },
  { href: SITE_LINKS.linkedin, icon: 'linkedin', label: 'LinkedIn' },
  { href: SITE_LINKS.instagram, icon: 'instagram', label: 'Instagram' },
  { href: `mailto:${SITE_LINKS.contactEmail}`, icon: 'envelope', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-14 py-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block no-underline">
              <img src="/icon.svg" alt="ML@UVA" className="h-9" />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-[240px]">
              The machine learning organization at the University of Virginia.
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, icon, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/30 hover:border-white/30 hover:text-white/70 transition-all duration-200 no-underline"
                  >
                    <Icon name={icon} className="w-4 h-4" />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white/25 text-[0.6rem] tracking-[0.25em] uppercase font-semibold mb-5">Pages</p>
            <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {footerNav.map(({ name, link }) => (
                <Link
                  key={link}
                  href={link}
                  className="text-white/40 text-sm no-underline hover:text-white/70 transition-colors duration-200"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom */}
        <div className="py-6">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} ML@UVA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
