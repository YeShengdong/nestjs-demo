import { IErrorCodeMessageMapping } from './error-code';
import { exampleErrorCodeMessageMapping } from './example-error-code.config';

export const errorCodeMessageMapping: IErrorCodeMessageMapping = {
  500: 'System error. Try again later',
  ...exampleErrorCodeMessageMapping,
};
