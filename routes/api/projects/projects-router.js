const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'could not get projects' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      console.log('project from /:id', project);

      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'id is incorrect.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not retrieve projects' });
    });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  console.log(req.body, req.params);
  Projects.findTasks(id)
    .then(tasks => {
      console.log('tasks', tasks);
      if (tasks) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not retrieve tasks' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not retrieve tasks' });
    });
});

router.get('/:id/resources', (req, res) => {
  const { id } = req.params;

  Projects.findResources(id)
    .then(resources => {
      console.log('resources', resources);
      if (resources[0]) {
        res.json(resources);
      } else {
        res.status(404).json({ message: 'Could not retrieve resources' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not retrieve resources' });
    });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.add(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create a project' });
    });
});

router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params;

  console.log(req.body);
  Projects.findById(id)
    .then(task => {
      if (task) {
        Projects.addTask(taskData, id).then(task => {
          console.log('task created', task);
          res.status(201).json(task);
        });
      } else {
        res.status(404).json({ message: 'Could not add task.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not create new tasks' });
    });
});

router.post('/:id/resources', (req, res) => {
  const resourceData = req.body;
  const { id } = req.params;

  console.log(req.body);
  Projects.findById(id)
    .then(resource => {
      if (resource) {
        Projects.addResource(resourceData, id).then(resource => {
          console.log('resource created', resource);
          res.status(201).json(resource);
        });
      } else {
        res.status(404).json({ message: 'Could not create a new resource.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not create a new resource' });
    });
});

module.exports = router;
