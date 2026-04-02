'use client';
import { useState, useEffect } from "react";
import "@/css/parent.css";
import "@/index.css";
import Carousel from "react-bootstrap/Carousel";
import { motion } from "framer-motion";
import Calendar from "@/components/custom/Calendar/Calendar";
import InteractiveBackground from "@/components/InteractiveBackground";
import { getGoogleMapsUrl } from "./actions";
import { SITE_LINKS } from "./lib/constants";

const imgPathList: string[] = [
  "/img/home/lecture1.jpeg",
  "/img/home/aieverywhere.jpeg",
  "/img/home/emmatalha.jpg",
  "/img/home/linklab.jpg",
  "/img/home/speaking-panelists.jpg",
];

function Home() {
  const [mapUrl, setMapUrl] = useState<string>("");

  useEffect(() => {
    getGoogleMapsUrl("Olsson+Hall/@38.032088,-78.5132753,17z/data=!3m1!4b1!4m6!3m5!1s0x89b3865b43b6ada7:0x1861384e69939c07!8m2!3d38.032088!4d-78.510695!16s%2Fg%2F11bwhbd54d!5m1!1e2?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D").then(setMapUrl);
  }, []);

  return (
    <div className="main-body body">
      <header className="masthead home-masthead">
        <InteractiveBackground />
        <div className="masthead-overlay"></div>
        <div className="masthead-content">
          <div className="masthead-heading text-uppercase">
            <h1>
              <span className="color-emph">ML</span>@UVA
            </h1>
          </div>
          <div className="masthead-subheading">
            The <span className="color-emph">Machine Learning</span>{" "}
            organization at UVA
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                {SITE_LINKS.registerLink ? (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-dark btn-social mx-2"
                    href={SITE_LINKS.registerLink}
                    aria-label="Join"
                    target="_blank"
                  >
                    <i className="fa-solid fa-right-to-bracket fa-2x"></i>
                  </motion.a>
                ) : (
                  <div />
                )}
                <a
                  className="btn btn-dark btn-social mx-2"
                  href={SITE_LINKS.discord}
                  aria-label="Discord"
                  target="_blank"
                >
                  <i className="fab fa-discord fa-2x"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href={SITE_LINKS.linkedin}
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in fa-2x"></i>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href={SITE_LINKS.instagram}
                  aria-label="instagram"
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center half-carasoul">
              <Carousel data-bs-theme="dark" className="carasoul">
                {imgPathList.map((item, idx) => (
                  <Carousel.Item interval={5000} key={idx}>
                    <a href={item} target="_blank">
                      <img
                        className="img-fluid"
                        src={item}
                        alt={item}
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-lg-5">
              <h4 className="my-3 text-uppercase">"HOO" are we?</h4>
              <p className="text-muted">
                We are the comprehensive machine learning/artificial
                intelligence organization at UVA with 200+ members. We strive to
                increase the accessibility of ML knowledge at UVA for all,
                regardless of their prior background. Whether you are a seasoned
                ML specialist or are just curious about ML, ML@UVA can provide
                you with the appropriate resources, support, and opportunities.
                We aim to expand the accessibility of machine learning knowledge
                at UVA by enabling access to knowledge, experiences, and
                opportunities for all.
              </p>
              <p className="text-muted">
                <em>
                  Formerly SIGAI (Special Interest Group on Artificial
                  Intelligence) under ACM
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-light" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="text-uppercase">What we do</h2>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-calendar-days fa-stack-1x"></i>
              </span>
              <h4 className="my-3">Events</h4>
              <p className="text-muted">
                We host mini-challenges, faculty panels, networking sessions, and
                collaborative workshops that enable members to connect, share
                knowledge, and advance their technical skills in machine learning.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-chalkboard-user fa-stack-1x"></i>
              </span>
              <h4 className="my-3">Education</h4>
              <p className="text-muted">
                We provide weekly lectures and reading groups, student-led seminars,
                mentorship programs, comprehensive educational resources, and
                guidance for undergraduate research opportunities.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-code fa-stack-1x"></i>
              </span>
              <h4 className="my-3">Projects</h4>
              <p className="text-muted">
                Members gain hands-on experience developing solutions for industry
                clients and receive guidance on interest-driven projects, from
                educational initiatives to advanced machine learning applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-light">
        <Calendar />
      </section>

      <section className="page-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-center text-uppercase">Get Involved</h2>
            </div>
            <div className="col-lg-8">
              <div className="row justify-content-center">
                {SITE_LINKS.registerLink ? (
                  <a
                    href={SITE_LINKS.registerLink}
                    className="link-with-icon"
                    target="_blank"
                  >
                    <span>Join ML@UVA</span>{" "}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                ) : (
                  <div />
                )}
              </div>
              <div className="row justify-content-center">
                <a
                  href={SITE_LINKS.discord}
                  className="link-with-icon"
                  target="_blank"
                >
                  <span>Join our Discord</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="row">
                <span>
                  Contact us at{" "}
                  <a
                    className="link-with-icon"
                    href={`mailto:${SITE_LINKS.contactEmail}`}
                    target="_blank"
                  >
                    <span>contact-ml@virginia.edu</span>
                    <i className="fas fa-envelope"></i>
                  </a>
                </span>
              </div>
              <hr />
              <div className="row mt-4">
                <div className="col-lg-8">
                  {mapUrl && (
                    <iframe
                      width="100%"
                      height="300px"
                      src={mapUrl}
                    ></iframe>
                  )}
                </div>
                <div className="col-lg-4">
                  <p>
                    We hold weekly... <br></br>
                    <strong>Lectures (Wednesdays, Olsson Hall)</strong>,{" "}
                    <br></br>
                    <strong>Reading Groups (Mondays)</strong>, and <br></br>
                    <strong>
                      General Body Meetings (Sundays, Olsson Hall)
                    </strong>{" "}
                    <br></br>
                    Check our Discord for the exact times and room numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
