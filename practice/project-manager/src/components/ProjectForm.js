import React, { useState } from 'react';
import { createProject } from '../api';
import './ProjectForm.css';

const ProjectForm = ({ onProjectAdded }) => {
  const [name, setName] = useState('');
  const [measurement, setMeasurement] = useState('Metric');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { name, measurement };
    await createProject(project);
    onProjectAdded();
  };

  return (
    <div className="project-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New project"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={150}
        />
        <select value={measurement} onChange={(e) => setMeasurement(e.target.value)}>
          <option value="Metric">Metric</option>
          <option value="Imperial">Imperial</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProjectForm;