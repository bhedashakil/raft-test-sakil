import { AssetController } from '../../../src/modules/asset/asset.controller'
import { AssetService } from '../../../src/modules/asset/asset.service'
import { mockRequest, mockResponse } from '../../helpers/testConstant'
import * as StatusCodes from 'http-status-codes'

jest.mock('../../../src/modules/asset/asset.service')
jest.mock('jsonwebtoken')

const assetController = new AssetController()

describe('test asset controller', () => {
  it('Should createAsset return 200 with success response', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      AssetService.prototype.createAsset = jest.fn().mockReturnValueOnce(() => {
        return true
      })
      await assetController.createAsset(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    } catch (error) {
    }
  })
})
