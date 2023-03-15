export interface IStandardResponse {
  success: boolean;
  message?: string;
  code?: number;
}

export interface IPagination {
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
}
export interface IStandardErrorResponse extends IStandardResponse {
  error?: any;
  data?: any;
  details?: any;
  errorCode?: any;
  firstName?: string;
}

export interface IStandardSuccessResponse extends IStandardResponse {
  data: object;
  pagination?: IPagination;
}
