/* eslint-disable no-unused-vars */
import * as bcrypt from 'bcrypt'
import { IUser } from './user.type'
import { pool, AppError } from '../../helpers'
import { UserDao } from './user.dao'

/**
 * UserService
 *
 */
export class UserService {

  public async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10)
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hash)
  }

  public async createUser(userDetails: IUser): Promise<any> {
    const userDao: UserDao = new UserDao()
    const userExist: any = await userDao.checkUserExist(userDetails.email)
    if (userExist) {
      throw new AppError(userExist.statusCode, userExist.errorCode, userExist.message)
    }
    userDetails.password = await this.generateHash(userDetails.password)
    return userDao.create(userDetails)
  }
}
