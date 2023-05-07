import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    directory: './src/knexMigrations',
    tableName: 'knex_migrations',
  }
}

const instance: Knex = knex(config as Knex.Config)

console.log(
  `Will connect to mysql://${config.connection.user}@${
    config.connection.host
  }/${config.connection.database}`
  )
  instance
    .raw('select 1')
    .then(() => {
      console.log(`Connected to database - OK`);
    })
    .catch(err => {
    console.error(`Failed to connect to database: ${err}`);
    process.exit(1);
  })

export const knexInstance = (): Knex => instance

// Returns a timestamp suitable for inserting into Postgres
export const timestamp = (): string => new Date().toUTCString()