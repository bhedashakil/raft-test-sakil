import * as Knex  from 'knex'

export async function up(knex: Knex): Promise<any> {
   await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.uuid('uid');
    table.string('email');
    table.string('password');
    table.string('name');
    table.integer('company_id')
    .unsigned()
    .index()
    .references('id')
    .inTable('companies');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('users')
}
