import React from 'react';
import './Skills.scss';
import skillsImg from '../../assets/skills4.png';

const skills = [
  { name: 'Git', icon: 'fab fa-git-alt', color: '#f34f29' },
  { name: 'HTML5', icon: 'fab fa-html5', color: '#e34c26' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#2965f1' },
  { name: 'Redux', icon: 'devicon-redux-original', color: '#764abc' },
  { name: 'Sass', icon: 'fab fa-sass', color: '#cc6699' },
  { name: 'Material UI', icon: 'devicon-materialui-plain', color: '#007fff' },
  { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e' },
  { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Angular', icon: 'devicon-angularjs-plain', color: '#dd0031' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178c6' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', color: '#ffca28' },
  { name: 'Springboot', icon: 'devicon-spring-plain', color: '#6db33f' },
  { name: 'Jenkins', icon: 'devicon-jenkins-line', color: '#d24939' },
  { name: 'CI/CD', icon: 'fas fa-sync-alt', color: '#2563eb' },
  { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952b3' },
  { name: 'REST API', icon: 'fas fa-cloud', color: '#38bdf8' },
];

// Split skills into two halves for left and right sides
const leftSkills = skills.slice(0, Math.ceil(skills.length / 2));
const rightSkills = skills.slice(Math.ceil(skills.length / 2));

const containerWidth = 1400;
const containerHeight = 600;
const centerX = containerWidth / 2;
const centerY = containerHeight / 2;
const radius = containerHeight / 2 - 40;

// Left semicircle: angles from -150deg to 150deg (-5π/6 to 5π/6)
const leftStartAngle = (100 * Math.PI) / 180;
const leftEndAngle = (260 * Math.PI) / 180;
const leftPositions = leftSkills.map((_, idx) => {
  const angle =
    leftStartAngle +
    ((leftEndAngle - leftStartAngle) * idx) / (leftSkills.length - 1);
  return {
    top: centerY + radius * Math.sin(angle) - 20,
    left: centerX + radius * Math.cos(angle) - 200,
  };
});

// Right semicircle: angles from 30deg to 330deg (π/6 to 11π/6)
const rightStartAngle = (280 * Math.PI) / 180;
const rightEndAngle = (450 * Math.PI) / 180;
const rightPositions = rightSkills.map((_, idx) => {
  const angle =
    rightStartAngle +
    ((rightEndAngle - rightStartAngle) * idx) / (rightSkills.length - 1);
  return {
    top: centerY + radius * Math.sin(angle) - 20,
    left: centerX + radius * Math.cos(angle) + 180,
  };
});

const Skills: React.FC = () => (
  <section className="skills-section skills-image">
    <h2 className="skills-title">Exceptional Skills</h2>
    <div className="skills-image-container">
      <img src={skillsImg} alt="Skills Layout" className="skills-bg-image" />
      <div className="skills-image-list">
        {leftSkills.map((skill, idx) => (
          <div
            className="skill-image-item"
            style={{
              borderColor: skill.color,
              top: leftPositions[idx].top,
              left: leftPositions[idx].left,
            }}
            key={skill.name}
          >
            <span className="skill-image-icon" style={{ color: skill.color }}>
              <i className={skill.icon}></i>
            </span>
            <span className="skill-image-name">{skill.name}</span>
          </div>
        ))}
        {rightSkills.map((skill, idx) => (
          <div
            className="skill-image-item"
            style={{
              borderColor: skill.color,
              top: rightPositions[idx].top,
              left: rightPositions[idx].left,
            }}
            key={skill.name}
          >
            <span className="skill-image-icon" style={{ color: skill.color }}>
              <i className={skill.icon}></i>
            </span>
            <span className="skill-image-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
