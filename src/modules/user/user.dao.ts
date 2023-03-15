/* eslint-disable no-unused-vars */
import * as bcrypt from 'bcrypt'
import { IUser } from './user.type'
import { pool, AppError } from '../../helpers'
import { Messages } from '../../constants'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../../logger'
import * as StatusCodes from 'http-status-codes'
import { COMMON_ERROR, USER_ERROR } from '../../constants/constant'

/**
 * UserDao
 *
 */
export class UserDao {

  public async create(user: any): Promise<any> {
    try {
      const stmt: string = 'INSERT INTO users (uid, email, password, name, company_id) VALUES(?, ?, ?, ?, ?);'
      const result: any = await pool.promise().query(stmt, [
        uuidv4(),
        user.email,
        user.password,
        user.name,
        1,
      ])
      if (!result || result.affectedRows < 1) {
        return false
      }
      return true
    } catch (e) {
      logger.error('Create User error', { err: e })
      throw new AppError(StatusCodes.BAD_REQUEST, COMMON_ERROR.SOMETHING_BAD, Messages.SOMETHING_BAD)
    }
  };

  public async getUserByEmail(email: string): Promise<IUser | boolean | IUser[]> {
    const stmt: string = 'SELECT * FROM users WHERE email = ?'
    const userResult: any = await pool.promise().query(stmt, [email])
    if (userResult[0].length === 0) {
      return false
    }
    return userResult[0]
  }

  public async checkUserExist(email: string): Promise<boolean | object> {
    const emailStmt: string = 'SELECT * FROM users WHERE email = ?'
    const emailResult: any = await pool.promise().query(emailStmt, email)
    if (emailResult[0].length > 0) {
      return { statusCode: StatusCodes.BAD_REQUEST, errorCode: USER_ERROR.EMAIL_ALREADY_EXIST, message: Messages.EMAIL_ALREADY_EXISTS }
    }
    return false
  }

  public async getCompanyByUserEmail(email: string): Promise<IUser | boolean | IUser[]> {
    const stmt: string = 'SELECT companies.name as company_name FROM users LEFT JOIN companies ON users.company_id = companies.id WHERE users.email = ?'
    const userResult: any = await pool.promise().query(stmt, [email])
    if (userResult[0].length === 0) {
      return false
    }
    return userResult[0]
  }

}
