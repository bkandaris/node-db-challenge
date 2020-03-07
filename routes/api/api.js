const express = require('express');

const projectsRouter = require('./projects/projects-router.js');

const router = express.Router();

router.use('/projects', projectsRouter);

module.exports = router;
