export class AppError {
  statusCode: number;
  message: string;
  errorCode: number;
  firstName?: string;

  constructor (statusCode: number, errorCode: number, message: string, firstName?: string) {
    this.statusCode = statusCode
    this.message = message
    this.errorCode = errorCode
    this.firstName = firstName
  }
}
