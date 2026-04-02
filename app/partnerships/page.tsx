'use client';
import Link from 'next/link';
import './Partnerships.css';

interface PartnershipType {
  icon: string;
  title: string;
  description: string;
}

const partnershipTypes: PartnershipType[] = [
  {
    icon: '',
    title: 'Consulting Partnerships',
    description: 'Connect with experienced ML@UVA members to tackle cutting-edge machine learning challenges. Our consulting teams provide innovative solutions to complex business problems.',
  },
  {
    icon: '',
    title: 'Industry Partnerships',
    description: 'Access top undergraduate and graduate talent in ML. We offer multiple events throughout the semester tailored to connect your company with our vibrant community.',
  },
  {
    icon: '',
    title: 'Research Partnerships',
    description: 'Collaborate on original research at the intersection of exciting ML subfields. Work with our talented student researchers on cutting-edge projects.',
  },
];

export default function Partnerships() {
  return (
    <div className="partnerships-container">
      <div className="partnerships-header">
        <h1>Partnerships</h1>
        <p>Work with ML@UVA to advance machine learning innovation and education</p>
      </div>

      <div className="partnerships-grid">
        {partnershipTypes.map((partnership, index) => (
          <div key={index} className="partnership-card">
            <div className="partnership-icon">{partnership.icon}</div>
            <h3>{partnership.title}</h3>
            <p>{partnership.description}</p>
          </div>
        ))}
      </div>

      <div className="partnerships-cta">
        <h2>Ready to Partner with Us?</h2>
        <p>We're always looking for organizations interested in collaborating with talented ML students and researchers.</p>
        <Link href="/resources" className="contact-btn">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
