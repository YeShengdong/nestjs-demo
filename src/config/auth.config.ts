import { registerAs } from '@nestjs/config';
import { parseBooleanValue } from './config.utils';

export default registerAs('auth', () => {
  const { AUTH_DISABLED = false } = process.env;

  return {
    disabled: parseBooleanValue(AUTH_DISABLED),
  };
});
