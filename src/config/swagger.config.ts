import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => {
  const {
    SWAGGER_VERSION = '1.0',
    SWAGGER_TITLE = 'API Title',
    SWAGGER_DESCRIPTION = 'API Description',
    SWAGGER_PATH = 'swagger',
    SWAGGER_SERVER,
  } = process.env;

  return {
    path: SWAGGER_PATH,
    title: SWAGGER_TITLE,
    description: SWAGGER_DESCRIPTION,
    version: SWAGGER_VERSION,
    server: SWAGGER_SERVER,
  };
});
