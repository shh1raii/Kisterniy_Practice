import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';
import ProjectItem from './ProjectItem';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
        setFilteredProjects(result); // Initialize filtered projects
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const results = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  const handleDelete = (projectId) => {
    const updatedProjects = projects.filter(project => project._id !== projectId);
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };

  return (
    <div className="project-list-container">
      <div className="search-and-add">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

      </div>
      <div className="project-list">
        {filteredProjects.map((project) => (
          <ProjectItem key={project._id} project={project} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;