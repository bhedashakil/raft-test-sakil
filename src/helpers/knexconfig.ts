import { MYSQLDB } from './dbConstant'
import * as path from 'path'
export namespace Knex {
  export const config = {
    client: 'mysql',
    connection: {
      host: MYSQLDB.host,
      user: MYSQLDB.user,
      password: MYSQLDB.password,
      database: MYSQLDB.database
    },
    migrations: {
      directory: path.join(__dirname, './../../migrations')
    },
    debug: true
  }
}
