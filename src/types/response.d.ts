interface IBaseResponseFormat {
  code?: number;
  message: string;
}

declare interface IResponseFormat extends IBaseResponseFormat {
  data: any;
}

declare interface IErrorResponseFormat extends IBaseResponseFormat {
  statusCode: number;
}
