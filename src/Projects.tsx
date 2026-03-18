import React from 'react';

const Projects: React.FC = () => (
  <section className="projects">
    <h2>Projects</h2>
    <div className="project-list">
      <div className="project">
        <h3>Portfolio Website</h3>
        <p>A personal portfolio website built with React and Vite.</p>
      </div>
      <div className="project">
        <h3>Task Manager App</h3>
        <p>A productivity app to manage daily tasks, built with React and TypeScript.</p>
      </div>
    </div>
  </section>
);

export default Projects;
