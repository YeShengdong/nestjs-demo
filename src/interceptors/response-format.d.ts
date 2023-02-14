export interface IBaseResponseFormat {
  code?: number;
  message: string;
}

export interface IResponseFormat extends IBaseResponseFormat {
  data: any;
}

export interface IErrorResponseFormat extends IBaseResponseFormat {
  statusCode: number;
}
