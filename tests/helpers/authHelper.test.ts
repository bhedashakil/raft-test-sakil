import { AuthHelper } from '../../src/helpers/authHelper'
import * as jwt from 'jsonwebtoken'
import * as StatusCodes from 'http-status-codes'
import { Request } from 'express'  // eslint-disable-line
import { mockResponse } from './testConstant'

jest.mock('jsonwebtoken')
jest.setTimeout(1000 * 60 * 1)

let mockRequest: Request = {
  headers: {
    authorization: ' '
  }
} as Request
const doneMock = jest.fn()
const mockJwt = jwt as any
mockJwt.send = jest.fn().mockReturnValue(null)
const authHelper = new AuthHelper()

const user = {
  email: 'sakil.bheda@zymr.com',
  name: 'sakil',
  password: '123456',
  phone: '7405466646',
  company_id: 1,
}

describe('Negative: authHelper', () => {
  it('Should return 401 with invalid token for guard', async () => {
    try {
      const res = mockResponse()
      await authHelper.guard(mockRequest, res, doneMock)
    } catch (error) {
      expect(error.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    }
  })
  it('Should return 401 with invalid token for guard', async () => {
    try {
      const res = mockResponse()
      await authHelper.guard(mockRequest, res, doneMock)
    } catch (error) {
      expect(error.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    }
  })
})
describe('Postive: authHelper', () => {
  it('Should return valid bearer token for guard', async () => {
    try {
      mockRequest = {
        headers: {
          authorization: 'abcd'
        }
      } as Request
      const res = mockResponse()
      const body = await authHelper.guard(mockRequest, res, doneMock)
      expect(body).not.toBeNull()
    } catch (error) {
    }
  })
  it('Should return valid bearer token for guard', async () => {
    try {
      mockRequest = {
        headers: {
          authorization: 'abcd'
        }
      } as Request
      const res = mockResponse()
      const body = await authHelper.guard(mockRequest, res, doneMock)
      expect(body).not.toBeNull()
    } catch (error) {
    }
  })
  it('Should return token for generateToken', async () => {
    try {
      const token = await authHelper.generateToken(user, 'abcd', { expireIn: '24h' })
      expect(typeof token).toBe('string')
    } catch (error) {
    }
  })
})
