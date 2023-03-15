import * as Knex from "knex";
import { v4 as uuidv4 } from 'uuid'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('companies', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.uuid('uid');
        table.string('name');
        table.timestamps(true, true);
    });
    await knex('companies').insert([
        {uid :  uuidv4(), name:'zymr'},
    ]);
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('companies')
}
