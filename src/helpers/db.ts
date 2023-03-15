import * as mysql from 'mysql2'
import { MYSQLDB } from './dbConstant'

export const pool = mysql.createPool({
  host: MYSQLDB.host,
  user: MYSQLDB.user,
  password: MYSQLDB.password,
  database: MYSQLDB.database,
  port: 3306
})
