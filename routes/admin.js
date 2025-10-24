const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Dashboard view
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render('admin', { projects, skills });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin page');
  }
});

// Add Project
router.post('/projects', async (req, res) => {
  try {
    await Project.create(req.body);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding project');
  }
});

// Delete Project
router.post('/projects/:id/delete', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

// Add Skill
router.post('/skills', async (req, res) => {
  try {
    await Skill.create(req.body);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding skill');
  }
});

// Delete Skill
router.post('/skills/:id/delete', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
