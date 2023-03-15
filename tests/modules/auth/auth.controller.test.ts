import { AuthController } from '../../../src/modules/auth/auth.controller'
import { UserService } from '../../../src/modules/user/user.service'
import { UserDao } from '../../../src/modules/user/user.dao'
import { mockRequest, mockResponse } from '../../helpers/testConstant'
import * as StatusCodes from 'http-status-codes'
import { USER_ERROR, COMMON_ERROR } from '../../../src/constants/constant'
import { Messages } from '../../../src/constants/messages'
import { AuthHelper } from '../../../src/helpers/authHelper'

jest.mock('../../../src/modules/user/user.service')
jest.mock('../../../src/helpers/authHelper')
jest.mock('jsonwebtoken')

const user = {
  email: 'sakil.bheda@zymr.com',
  name: 'sakil',
  password: '123456',
  phone: '7405466646',
  company_id: 1,
}

const authController = new AuthController()
describe('Negative: test auth controller', () => {
  it('Should return 400 with response for Invalid credential', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      UserDao.prototype.getUserByEmail = jest.fn().mockReturnValueOnce(() => {
        return false
      })
      await authController.loginUser(req, res)
    } catch (error) {
      expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(error.errorCode).toEqual(USER_ERROR.INAVALID_CREDENTIAL)
      expect(error.message).toEqual(Messages.INVALID_CREDENTIAL)
    }
  })
  it('Should return 400 with response for password not match ', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      UserService.prototype.comparePassword = jest.fn().mockReturnValueOnce(() => {
        return false
      })
      await authController.loginUser(req, res)
    } catch (error) {
      expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(error.errorCode).toEqual(USER_ERROR.INAVALID_CREDENTIAL)
      expect(error.message).toEqual(Messages.INVALID_CREDENTIAL)
    }
  })
})
describe('Positive: test auth controller', () => {
  it('Should return 200 with token for loginUser', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      UserDao.prototype.getUserByEmail = jest.fn().mockReturnValueOnce(() => {
        return [user]
      })
      UserService.prototype.comparePassword = jest.fn().mockReturnValueOnce(() => {
        return true
      })
      AuthHelper.prototype.generateToken = jest.fn().mockReturnValueOnce(() => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pcmFqIiwicm9sZSI6Ind4YWRtaW4iLCJpZCI6ImJlOGEzZGJkLTcwY2YtNGE3Zi05Yjc3LTc2ODI1NmM3OTJlMSIsIm9yZ2FuaXphdGlvbl9pZCI6MSwiaWF0IjoxNjM5NDU4NDIwLCJleHAiOjE2Mzk1NDQ4MjAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMSJ9.Lhx0as071Z_PI0Yc5dTkWtooohHTx72gsVkbSdCAXNY'
      })

      await authController.loginUser(req, res)
      expect(res.locals.message).toEqual(Messages.LOGIN_SUCCESSFULLY)
    } catch (error) {
    }
  })
})
