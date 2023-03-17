import { Environment } from './config.interface';

export const parseBooleanValue = (
  value: boolean | string | undefined,
): boolean => {
  return value === 'true' || value === true;
};

export const getNodeEnv = (): Environment => {
  return (process.env.NODE_ENV as Environment) || Environment.Development;
};
