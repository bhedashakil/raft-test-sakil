/* eslint-disable no-unused-vars */
import * as express from 'express'
import { UserController } from './modules/user/user.controller'
import { AuthController } from './modules/auth/auth.controller'
import { AssetController } from './modules/asset/asset.controller'

export function registerRoutes(app: express.Application): void {
  new UserController().register(app)
  new AuthController().register(app)
  new AssetController().register(app)

}
