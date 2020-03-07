const db = require('../../../data/db-config.js');

module.exports = {
  find,
  add,
  findById,
  findTasks,
  addTask,
  addResource,
  findResources
};

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function findTasks(id) {
  return db('tasks')
    .select('tasks.id', 'tasks.*', 'projects.name', 'projects.description')
    .join('projects', 'projects.id', 'tasks.project_id')
    .where('project_id', id);
}

function findResources(id) {
  return db('resources')
    .select('resources.id', 'resources.name')
    .join('project-resources', 'project-resources.resources_id', 'resources.id')
    .where('project_id', id);
}

function add(project) {
  return db('projects').insert(project, 'id');
}

function addTask(id) {
  return db('tasks')
    .join('projects', 'projects.id', 'tasks.project_id')
    .insert(id);
}

function addResource(id) {
  return db('resources')
    .join('projects', 'projects.id', 'resources.project_id')
    .insert(id);
}
