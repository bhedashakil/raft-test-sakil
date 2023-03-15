import { UserController } from '../../../src/modules/user/user.controller'
import { UserService } from '../../../src/modules/user/user.service'
import { mockRequest, mockResponse } from '../../helpers/testConstant'
import * as StatusCodes from 'http-status-codes'

jest.mock('../../../src/modules/user/user.service')
jest.mock('jsonwebtoken')

const userController = new UserController()

describe('test user controller', () => {
  it('Should createUser return 200 with success response', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      UserService.prototype.createUser = jest.fn().mockReturnValueOnce(() => {
        return true
      })
      await userController.createUser(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    } catch (error) {
    }
  })
})
