import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProject } from '../api';
import './ProjectItem.css';

const ProjectItem = ({ project, onDelete, onSelect, isSelected }) => {
  
  const handleDelete = async () => {
    try {
      await deleteProject(project._id);
      onDelete(project._id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };
  
  return (
    <div className="project-item grid-item">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(project.id)}
      />
      <Link to={`/projects/${project.id}/images`}>
        <h3>{project.name}</h3>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ProjectItem;