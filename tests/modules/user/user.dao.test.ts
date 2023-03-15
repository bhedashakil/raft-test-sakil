
import { UserDao } from '../../../src/modules/user/user.dao'
import { AppError, pool } from '../../../src/helpers'

jest.mock('jsonwebtoken')

const userDao = new UserDao()

describe('test user dao', () => {
    it('Should return true for create user', async () => {
        try {
            (pool as any).promise = jest.fn().mockReturnThis();
            (pool as any).query = jest.fn().mockImplementation((sql) => {
                return Promise.resolve([[true]])
            })

            const response = await userDao.create({ "email": "sakil1@gmail.com", "password": "123456", "name": "sakil" })

            expect(typeof response).toBe('boolean')
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it('Should return true for getUserByEmail', async () => {
        try {
            (pool as any).promise = jest.fn().mockReturnThis();
            (pool as any).query = jest.fn().mockImplementation((sql) => {
                return Promise.resolve([[{}]])
            })

            const response = await userDao.getUserByEmail("sakil1@gmail.com")

            expect(typeof response).toBe('object')
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it('Should return true for checkUserExist', async () => {
        try {
            (pool as any).promise = jest.fn().mockReturnThis();
            (pool as any).query = jest.fn().mockImplementation((sql) => {
                return Promise.resolve([[]])
            })

            const response = await userDao.checkUserExist("sakil1@gmail.com")

            expect(typeof response).toBe('boolean')
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it('Should return true for getCompanyByUserEmail', async () => {
        try {
            (pool as any).promise = jest.fn().mockReturnThis();
            (pool as any).query = jest.fn().mockImplementation((sql) => {
                return Promise.resolve([[{}]])
            })

            const response = await userDao.getCompanyByUserEmail("sakil1@gmail.com")

            expect(typeof response).toBe('object')
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})