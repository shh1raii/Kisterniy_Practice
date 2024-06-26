const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

router.delete('/', async (req, res) => {
  const { ids } = req.body;
  await Project.deleteMany({ _id: { $in: ids } });
  res.status(204).end();
});

module.exports = router;