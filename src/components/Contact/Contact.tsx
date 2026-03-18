import React from 'react';
import './Contact.css';

const Contact: React.FC = () => (
  <section className="contact">
    <div className="contact-shell">
      <div className="contact-header">
        <p className="contact-eyebrow">Say hello</p>
        <h2 className="contact-title">Let's build something bold.</h2>
        <p className="contact-subtitle">
          Open to collaborations, product work, and frontend leadership roles. Reach out and
          I will get back within 24 to 48 hours.
        </p>
      </div>
      <div className="contact-grid">
        <a className="contact-card" href="mailto:anupbhagat23@gmail.com">
          <span className="contact-card-label">Email</span>
          <span className="contact-card-value">anupbhagat23@gmail.com</span>
          <span className="contact-card-action">Send a message -{'>'}</span>
        </a>
        <a
          className="contact-card"
          href="https://www.linkedin.com/in/anupbhagat23"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-card-label">LinkedIn</span>
          <span className="contact-card-value">linkedin.com/in/anupbhagat23</span>
          <span className="contact-card-action">Connect -{'>'}</span>
        </a>
      </div>
      <div className="contact-footer">
        Prefer a quick intro? Share a short note about your project or role.
      </div>
    </div>
  </section>
);

export default Contact;

