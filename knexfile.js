import dotenv from "dotenv";
dotenv.config();

export default {
  client: "mysql",
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    directory: "./src/knexMigrations",
    tableName: "knex_migrations",
  },
};
