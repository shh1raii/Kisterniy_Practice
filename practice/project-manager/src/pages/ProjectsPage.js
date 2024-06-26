import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleProjectAdded = () => {
    setRefresh(!refresh);
    setShowContextMenu(false); // Закрыть меню после добавления проекта
  };

  const handleSelectedProjectsChange = (selectedProjects) => {
    setSelectedProjects(selectedProjects);
  };

  return (
    <div className="projects-page container">
      <header>
        Practice Project v1.0
      </header>
      <div className="controls">
        <button onClick={() => setShowContextMenu(!showContextMenu)} className="new-project-button">
          New Project
        </button>
      </div>
      <div className="counter">
        {selectedProjects.length} items
      </div>
      {showContextMenu && <ProjectForm onProjectAdded={handleProjectAdded} />}
      <ProjectList
        key={refresh}
        searchQuery={searchQuery}
        onSelectedProjectsChange={handleSelectedProjectsChange}
      />
    </div>
  );
};

export default ProjectsPage;