'use client';
import Link from 'next/link';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About ML@UVA</h1>
        <p className="lead">Building a vibrant machine learning community at the University of Virginia</p>
      </div>

      <section className="about-section">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            ML@UVA is a student-run organization dedicated to advancing machine learning education,
            research, and industry collaboration at the University of Virginia. We believe in making
            machine learning accessible to all students while fostering innovation through hands-on
            projects and cutting-edge research.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Our Pillars</h2>
          <div className="pillars-grid">
            <div className="pillar">
              <h3>Education</h3>
              <p>
                We provide comprehensive learning resources through lectures, reading groups, and workshops
                to empower students at all levels of the ML journey.
              </p>
            </div>
            <div className="pillar">
              <h3>Research</h3>
              <p>
                Collaborate on original research at emerging ML subfields. We provide resources, mentorship,
                and funding for members to push the boundaries of machine learning.
              </p>
            </div>
            <div className="pillar">
              <h3>Partnerships</h3>
              <p>
                Connect top talent with industry leaders and research institutions through consulting projects
                and strategic partnerships that drive real-world impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Join Our Community</h2>
          <p>
            We welcome everyone interested in machine learning—whether you're just starting your ML journey or
            already working on advanced research. We accept applications at the beginning of each Fall and Spring semester.
          </p>
          <Link href="/resources" className="about-btn">
            Get Involved
          </Link>
        </div>
      </section>
    </div>
  );
}
