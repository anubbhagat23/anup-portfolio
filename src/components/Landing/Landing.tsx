import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';
import anupProfile from '../../assets/anup_profile.png'; // Update with your actual file name

const socialLinks = [
  { href: 'https://github.com/', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://linkedin.com/in/anupbhagat23', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { href: 'mailto:anupbhagat23@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

const Landing: React.FC = () => (
  <section className="landing">
    <div className="landing-gradient" />
    <div className="landing-content landing-flex">
      {/* Left Section: Full Image */}
      <div className="landing-left">
        <h1 className="landing-title">
          Hi, my <br/> name is <b>Anup</b><span className="dot">.</span>
        </h1>
        <h2 className="landing-subtitle">Senior Frontend Engineer & Web Specialist</h2>
        <p className="landing-description">
          Frontend-focused Senior Software Engineer with over <strong>10 years of experience</strong>
          building scalable, user-centric web applications for enterprise environments.
          Frontend-heavy expertise with intermediate backend experience, enabling strong
          end-to-end ownership of features. <span className="landing-highlight">Strong proficiency in React.js, Angular,
          JavaScript, UI architecture, and modern frontend tooling</span>, with hands-on experience
          in system design and collaborating closely with backend services. Also delivered
          <span className="landing-highlight">multiple freelance projects singlehandedly, owning full frontend development and</span>
          API integration. Proven ability to lead teams, drive end-to-end feature development,
          and deliver high-quality, production-ready applications.
        </p>
        <div className="landing-socials">
          {socialLinks.map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={link.label}>
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <div className="landing-actions">
          <Link to="/learnwithanup" className="landing-cta">Learn with Anup</Link>
        </div>
      </div>
      
      {/* Right Section: Info */}
      <div className="landing-right">
        <img
          src={anupProfile}
          alt="Anup Profile"
          className="landing-full-image"
        />
      </div>
      
    </div>
  </section>
);

export default Landing;











