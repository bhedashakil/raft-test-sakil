import { Messages } from '../../constants'
import { checkSchema } from 'express-validator'

const userRules: any = {
  createUser: checkSchema({
    email: {
      in: ['body'],
      trim: true,
      isEmail:true,
      notEmpty: true,
      errorMessage: 'Please enter valid email',
    },
    password: {
      in: ['body'],
      notEmpty: true,
      trim: true,
      isString: true,
      isLength: { options: { min: 6, max: 16 }},
      errorMessage: 'Password length must be between 6 to 16 characters',
    },
    confirmPassword: {
      in: ['body'],
      notEmpty: true,
      trim: true,
      isString: true,
      custom: {
        options: async (value, { req }) => {
          if (value === req.body.password) {
            return true
          }
          throw Messages.PASSWORD_CONFIRMPASSWORD
        }
      }
    },
    name: {
      in: ['body'],
      trim: true,
      notEmpty: true,
      isString: true,
      errorMessage: 'Please enter name',
    },
  })
}

export default userRules
