import { UserService } from '../../../src/modules/user/user.service'
import { mockRequest, mockResponse } from '../../helpers/testConstant'
import * as StatusCodes from 'http-status-codes'
import { AppError } from '../../../src/helpers'

jest.mock('jsonwebtoken')

const userService = new UserService()

describe('test user service', () => {
  it('Should createUser return 200 with success response', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      await userService.createUser({
        "email": "sakil1@gmail.com",
        "password": "123456",
        "confirmPassword": "123456",
        "name": "sakil1"
      })
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)

    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('Should generateHash return generated hash', async () => {
    try {
      const response = await userService.generateHash('123456')
      expect(typeof response).toBe('string')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('Should comparePassword return boolean for password', async () => {
    try {
      const response = await userService.comparePassword('123456', '123456')
      expect(typeof response).toBe('boolean')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
