import { registerAs } from '@nestjs/config';
import { ICorsConfig } from './config.interface';

export default registerAs('cors', () => {
  const { CORS_ORIGIN } = process.env;
  const config: Partial<ICorsConfig> = {};

  if (CORS_ORIGIN) {
    config.origin = CORS_ORIGIN;
  }

  return config;
});
