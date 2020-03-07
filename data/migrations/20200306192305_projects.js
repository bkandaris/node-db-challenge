exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();

      tbl
        .string('name', 225)
        .unique()
        .notNullable();
      tbl.text('description', 225);
      tbl.boolean('is_completed').defaultTo(false);
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.text('description', 225).notNullable();
      tbl.text('notes');
      tbl.boolean('is_completed').defaultTo(false);

      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .createTable('project-resources', tbl => {
      tbl.primary(['project_id', 'resources_id']);
      tbl.text('description');

      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl
        .integer('resources_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name', 225).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('tasks')
    .dropTableIfExists('project-resources')
    .dropTableIfExists('resources');
};
