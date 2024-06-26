import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ImagesPage from './pages/ImagesPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProjectsPage />} />
        <Route path="/projects/:projectId/images" element={<ImagesPage />} />
      </Routes>
    </Router>
  );
};

export default App;