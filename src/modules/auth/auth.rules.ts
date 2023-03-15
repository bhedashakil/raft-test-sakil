import { checkSchema } from 'express-validator'

export const authRules: any = {
  loginUser: checkSchema({
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
      errorMessage: 'Please enter valid password',
    }
  })
}
