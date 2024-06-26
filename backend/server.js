const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Project = require('./models/Project');
const Image = require('./models/Image');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/project_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.findByIdAndDelete(id);
    if (result) {
      res.status(200).send({ message: 'Project deleted successfully' });
    } else {
      res.status(404).send({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/api/projects/:projectId/images', async (req, res) => {
  try {
    const { projectId } = req.params;
    const images = await Image.find({ projectId: projectId });
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(404).send({ message: 'Images not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    const { projectId } = req.body;
    const newImage = new Image({
      url: `/uploads/${req.file.filename}`,
      projectId: projectId,
    });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});