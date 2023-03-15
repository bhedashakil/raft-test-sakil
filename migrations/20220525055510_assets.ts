import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("assets", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.uuid("uid");
    table.string("name");
    table.integer("status");
    table.string("note");
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("assets");
}
