/* eslint-disable no-unused-vars */
import { Application, Request, Response } from 'express'
import { Messages } from '../../constants'
import { ResponseHandler, AuthHelper, AppError } from '../../helpers'
import { BaseController } from '../BaseController'
import { APIROUTE, USER_ERROR, JWT } from '../../constants/constant'
import { authRules } from './auth.rules'
import { UserDao } from '../user/user.dao'
import { IUser } from 'modules/user/user.type'
import * as StatusCodes from 'http-status-codes'
import { UserService } from '../user/user.service'
/**
 * AuthController
 */
export class AuthController extends BaseController {
  public path = APIROUTE.auth

  constructor() {
    super()
    this.init()
  }

  public init(): void {
    const authHelper: AuthHelper = new AuthHelper()
    this.router.post('/', authRules.loginUser, authHelper.validation, this.loginUser)
  }

  public register(app: Application): void {
    app.use(`/api/${this.path}`, this.router)
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const authHelper: AuthHelper = new AuthHelper()
      const userDao: UserDao = new UserDao()
      const userService: UserService = new UserService()
      const userReq: IUser = req.body
      let userDetails: any = await userDao.getUserByEmail(userReq.email)
      if (!userDetails || !userDetails.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, USER_ERROR.INAVALID_CREDENTIAL, Messages.INVALID_CREDENTIAL)
      }
      const isPasswordValid: boolean = await userService.comparePassword(userReq.password, userDetails[0].password)
      if (!isPasswordValid) {
        throw new AppError(StatusCodes.BAD_REQUEST, USER_ERROR.INAVALID_CREDENTIAL, Messages.INVALID_CREDENTIAL)
      }

      userDetails = {
        email: userDetails[0].email,
        name: userDetails[0].name,
        id: userDetails[0].id,
      }
      const token: string = authHelper.generateToken(userDetails, JWT.secret, {
        issuer: JWT.issuer,
        expiresIn: JWT.expiresIn
      })
      userDetails.token = token
      res.locals.message = Messages.LOGIN_SUCCESSFULLY
      res.locals.data = userDetails
      ResponseHandler.JSONSUCCESS(req, res)
    } catch (err) {
      res.locals = {}
      res.locals.errorCode = err.errorCode
      res.locals.statusCode = err.statusCode
      res.locals.message = err.message
      res.locals.data = err
      ResponseHandler.JSONERROR(req, res, 'loginUser')
    }
  }
}
