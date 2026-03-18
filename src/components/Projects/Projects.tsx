import React, { useState } from 'react';
import {
  featuredProjects,
  freelanceProjects,
  professionalProjects
} from '../../constants/projects';
import './Projects.scss';

const Projects: React.FC = () => {
  const [featuredSelected, setFeaturedSelected] = useState(0);
  const [freelanceSelected, setFreelanceSelected] = useState(0);
  const [professionalSelected, setProfessionalSelected] = useState(0);

  const renderSection = (
    title: string,
    list: typeof professionalProjects,
    selected: number,
    setSelected: (value: number) => void
  ) => (
    <div className="projects-group">
      <h3 className="projects-group-title">{title}</h3>
      <div className="projects-split-container">
        {/* Left: List */}
        <div className="projects-list">
          {list.map((project, idx) => (
            <div
              className={`project-list-card${selected === idx ? ' active' : ''}`}
              key={project.title}
              onClick={() => setSelected(idx)}
            >
              <img src={project.image} alt={project.title} className="project-list-img" />
              <div className="project-list-info">
                <h3 className="project-list-title">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
        {/* Right: Details */}
        <div className="project-details">
          <div className="project-details-header">
            <h3 className="project-details-title">{list[selected].title}</h3>
            <span className="project-details-tenure">{list[selected].tenure}</span>
          </div>
          <img
            src={list[selected].image}
            alt={list[selected].title}
            className="project-details-img"
          />
          <p className="project-details-desc">{list[selected].description}</p>
          <div className="project-details-tech">
            {list[selected].tech.map((tech) => (
              <span className="tech-badge" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <div className="project-details-section">
            <h4>Roles</h4>
            <ul>
              {list[selected].roles.map((role, i) => (
                <li key={i}>{role}</li>
              ))}
            </ul>
          </div>
          <div className="project-details-section">
            <h4>Responsibilities</h4>
            <ul>
              {list[selected].responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
          {list[selected].link && (
            <a className="project-link" href={list[selected].link}>
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="projects-section split-layout">
      <div className="projects-header">
        <h2 className="projects-title">Projects</h2>
        <a
          className="resume-download"
          href="/Resume_UI_AnupBhagat-2026-Fullstack.pdf"
          download
        >
          Download Resume
        </a>
      </div>
      {featuredProjects.length > 0 &&
        renderSection('Featured Projects', featuredProjects, featuredSelected, setFeaturedSelected)}
      {freelanceProjects.length > 0 &&
        renderSection('Freelance Projects', freelanceProjects, freelanceSelected, setFreelanceSelected)}
      {professionalProjects.length > 0 &&
        renderSection(
          'Professional Experience',
          professionalProjects,
          professionalSelected,
          setProfessionalSelected
        )}
    </section>
  );
};

export default Projects;
