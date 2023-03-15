/* eslint-disable no-unused-vars */
import { Application, Request, Response } from 'express'
import { Messages } from '../../constants'
import { ResponseHandler, AuthHelper } from '../../helpers'
import { BaseController } from '../BaseController'
import { APIROUTE } from '../../constants/constant'
import userRules from './user.rules'
import { UserService } from './user.service'
/**
 * UserController
 */
export class UserController extends BaseController {
  public path = APIROUTE.users
  constructor() {
    super()
    this.init()
  }

  public init(): void {
    const authHelper: AuthHelper = new AuthHelper()
    this.router.post('/', userRules.createUser, authHelper.validation, this.createUser)
  }

  public register(app: Application): void {
    app.use(`/api/${this.path}`, this.router)
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userReq: any = req.body
      const userService: UserService = new UserService()
      await userService.createUser(userReq)
      res.locals = {}
      res.locals.message = Messages.USER_REGISTER_SUCCESSFULLY
      res.locals.data = []
      ResponseHandler.JSONSUCCESS(req, res)
    } catch (err) {
      res.locals.errorCode = err.errorCode
      res.locals.statusCode = err.statusCode
      res.locals.message = err.message
      res.locals.data = err
      ResponseHandler.JSONERROR(req, res, 'createUser')
    }
  }
}
