/* eslint-disable no-unused-vars */
import { Application, Request, Response } from 'express'
import { Messages } from '../../constants'
import { ResponseHandler, AuthHelper } from '../../helpers'
import { BaseController } from '../BaseController'
import { APIROUTE } from '../../constants/constant'
import assetRules from './asset.rules'
import { AssetService } from './asset.service'
import { AssetDao } from './asset.dao'
/**
 * AssetController
 */
export class AssetController extends BaseController {
  public path = APIROUTE.assets
  constructor() {
    super()
    this.init()
  }

  public init(): void {
    const authHelper: AuthHelper = new AuthHelper()
    this.router.post('/', authHelper.guard, assetRules.createAsset, authHelper.validation, this.createAsset)
    this.router.get(`/${APIROUTE.assetList}`, authHelper.guard, assetRules.getAssetList, authHelper.validation, this.getAssetList)
  }

  public register(app: Application): void {
    app.use(`/api/${this.path}`, this.router)
  }

  public async createAsset(req: any, res: Response): Promise<void> {
    try {
      const assetReq: any = req.body
      const files: any = req.files

      const assetService: AssetService = new AssetService()
      const resAsset = await assetService.createAsset(assetReq, files)
      res.locals = {}
      res.locals.message = Messages.ASSET_ADDED_SUCCESSFULLY
      res.locals.data = resAsset
      ResponseHandler.JSONSUCCESS(req, res)
    } catch (err) {
      res.locals.errorCode = err.errorCode
      res.locals.statusCode = err.statusCode
      res.locals.message = err.message
      res.locals.data = err
      ResponseHandler.JSONERROR(req, res, 'createAsset')
    }
  }

  public async getAssetList(req: Request, res: Response): Promise<void> {
    try {
      const asset: AssetService = new AssetService()
      const assetDao: AssetDao = new AssetDao()


      const assetReq: any = req.query
      if (assetReq?.company_id) {
        assetReq.company_id = `${assetReq.company_id.replace(/'/g, "''")}`
      }
      if (assetReq?.asset_ids) {
        assetReq.asset_ids = `${assetReq.asset_ids.replace(/'/g, "''")}`
      }
      const result: any = await asset.getAssetList(assetReq)
      const total: any = await assetDao.getTotalAssetList(assetReq)
      res.locals = {}
      res.locals.message = Messages.SUCCESS_RECEIVED
      res.locals.data = result
      res.locals.pagination = {
        totalRecords: total
      }
      ResponseHandler.JSONSUCCESS(req, res)
    } catch (err) {
      res.locals.errorCode = err.errorCode
      res.locals.statusCode = err.statusCode
      res.locals.message = err.message
      res.locals.data = err
      ResponseHandler.JSONERROR(req, res, 'getAssetList')
    }
  }


}
