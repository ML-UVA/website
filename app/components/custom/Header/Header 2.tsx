import "./Header.css";
import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { motion } from "framer-motion";

interface RoutesProp {
  children?: ReactNode;
}

const curr_page = typeof window !== 'undefined' ? window.location.pathname : '/';

function Header({ children = <div></div> }: RoutesProp) {
  const [navbarShrink, setNavbarShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 10) {
        setNavbarShrink(false);
      } else {
        setNavbarShrink(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <nav
        className={`navbar navbar-expand-md navbar-light fixed-top ${
          navbarShrink || curr_page !== "/" ? "navbar-shrink" : ""
        }`}
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <motion.img
              src="..//img/ML@UVA (square).png"
              alt="..."
              whileHover={{ scale: 1.1 }}
            />
          </a>
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
              {headersItems.map(({ name, link }) => (
                <li
                  className={`nav-item ${
                    curr_page == link ? "active-link" : ""
                  }`}
                  key={link}
                >
                  <a className="nav-link" href={link}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {curr_page !== "/" && curr_page.indexOf("/events/") === -1 ? (
        <div className="container-fluid spacer"></div>
      ) : (
        <div />
      )}
      {children}
    </Router>
  );
}

export default Header;
