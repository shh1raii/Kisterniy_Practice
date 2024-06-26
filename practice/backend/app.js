const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const projectsRoute = require('./routes/projects');
const imagesRoute = require('./routes/images');

const app = express();

mongoose.connect('mongodb://localhost:27017/project-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/projects', projectsRoute);
app.use('/api/projects', imagesRoute);

module.exports = app;