import * as dotenv from 'dotenv'
dotenv.config()

export const MYSQLDB = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB || 'sakil-poc'
}
