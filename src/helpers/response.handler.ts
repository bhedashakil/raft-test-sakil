/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'
import {
  IStandardErrorResponse,
  IStandardSuccessResponse
} from '../abstractions/ApiResponses'
import { Messages } from '../constants'
/**
 * response handler class
 */
// tslint:disable-next-line:no-unnecessary-class
export class ResponseHandler {
  public static JSONSUCCESS (req: Request, res: Response): void {
    const obj: IStandardSuccessResponse = {
      success: true,
      code: res.locals.code || HttpStatus.OK,
      data: res.locals.data,
      pagination: res.locals.pagination,
      message: res.locals.message || Messages.SUCCESS_RECEIVED
    }
    res.status(HttpStatus.OK).json(obj)
  }

  public static JSONERROR (req: Request, res: Response, apiName: string): void {
    let obj: IStandardErrorResponse = { success: false }
    const errors: any = res.locals.data
    let details: any = []
    let message: string = res.locals.data.message
    if (errors.name === 'TypeError') {
      for (const key in res.locals.data.errors) {
        const value: any = res.locals.data.errors[key]
        details.push({
          msg: value.msg,
          param: value.path
        })
      }
      message = res.locals.data._message
    } else {
      if (res.locals.data.length) {
        res.locals.data.map((data: any) => {
          data.location = undefined
        })
        details = res.locals.data
      }
    }
    const errorCode: number = res.locals.errorCode || null
    const statusCode: number = res.locals.statusCode || 500
    obj = {
      success: false,
      message: message || Messages.SOMETHING_BAD,
      details: details,
      errorCode: errorCode,
      firstName: res?.locals?.data?.firstName ?? undefined
    }
    res.status(statusCode).send(obj)
  }
}
