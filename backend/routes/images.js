const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/Image');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/:projectId/images', async (req, res) => {
  const images = await Image.find({ projectId: req.params.projectId });
  res.json(images);
});

router.post('/:projectId/images', upload.single('file'), async (req, res) => {
  const image = new Image({
    projectId: req.params.projectId,
    name: req.file.originalname,
    path: req.file.path,
  });
  await image.save();
  res.status(201).json(image);
});

router.delete('/:projectId/images', async (req, res) => {
  const { ids } = req.body;
  await Image.deleteMany({ _id: { $in: ids } });
  res.status(204).end();
});

module.exports = router;