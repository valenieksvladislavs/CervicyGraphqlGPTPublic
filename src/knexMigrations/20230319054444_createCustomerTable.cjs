/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("customer", function (table) {
    table.uuid("id").notNullable();
    table.string("email", 255).notNullable();
    table.string("phone", 255).nullable();
    table.string("password", 255).notNullable();
    table.string("first_name", 255).nullable();
    table.string("last_name", 255).nullable();
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("customer");
};
