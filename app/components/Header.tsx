'use client';
import "./Header.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Events", link: "/events" },
  { name: "Lectures", link: "/lectures" },
  { name: "Projects", link: "/projects" },
  { name: "Team", link: "/teams" },
  { name: "Reading Groups", link: "/reading-groups" },
  { name: "Resources", link: "/resources" },
];

export default function Header() {
  const pathname = usePathname();
  const [navbarShrink, setNavbarShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On homepage: show transparent navbar at top, dark when scrolled
      if (pathname === "/") {
        if (window.scrollY <= 10) {
          setNavbarShrink(false);
        } else {
          setNavbarShrink(true);
        }
      } else {
        // On other pages, always keep dark background
        setNavbarShrink(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <nav
      className={`navbar navbar-expand-md navbar-light fixed-top ${
        navbarShrink ? "navbar-shrink" : ""
      }`}
      id="mainNav"
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          <motion.img
            src="/icon.svg"
            alt="ML@UVA Logo"
            whileHover={{ scale: 1.1 }}
          />
        </Link>
        <motion.button
          className="navbar-toggler"
          whileHover={{ scale: 1.1 }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars ms-1"></i>
        </motion.button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            {navItems.map(({ name, link }) => (
              <li
                className={`nav-item ${
                  pathname === link ? "active-link" : ""
                }`}
                key={link}
              >
                <Link className="nav-link" href={link}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
