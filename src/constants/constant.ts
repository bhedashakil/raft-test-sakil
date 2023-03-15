export const APIROUTE = {
  users: 'users',
  assets: 'assets',
  auth: 'login',
  assetList: 'asset-list',

}

export const USER_ERROR = {
  EMAIL_ALREADY_EXIST: 1001,
  INAVALID_CREDENTIAL: 1003,

}

export const COMMON_ERROR = {
  INVALID_PARAMETER: 4000,
  UNAUTHORIZED_USER: 4001,
  SOMETHING_BAD: 1005
}

export const JWT = {
  secret: 'sakil@123078',
  issuer: process.env.API_HOST,
  expiresIn: '1d'
}

