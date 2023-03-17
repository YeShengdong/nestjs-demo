import * as Joi from 'joi';
import { Environment } from './config.interface';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      Environment.Production,
      Environment.Beta,
      Environment.Alpha,
      Environment.Development,
    )
    .default(Environment.Development),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  AUTH_HEADER_NAME: Joi.string().required(),
  AUTH_EXPIRES_IN: Joi.string().required(),
});
