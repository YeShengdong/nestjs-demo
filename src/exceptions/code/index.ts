import { ICodeMessageMapping } from './code.interface';
import { exampleErrorCodeMessageMapping } from './example.code';

export const successCodeMessageMapping: ICodeMessageMapping = {
  20001: 'Operation succeeded',
};

export const errorCodeMessageMapping: ICodeMessageMapping = {
  500: 'System error. Try again later',
  ...exampleErrorCodeMessageMapping,
};
