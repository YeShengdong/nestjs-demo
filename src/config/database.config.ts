import { registerAs } from '@nestjs/config';
import { parseBooleanValue } from './config.utils';

export default registerAs('database', () => {
  const {
    DATABASE_HOST = 'localhost',
    DATABASE_PORT = 3306,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_AUTO_LOAD_ENTITIES,
    DATABASE_SYNCHRONIZE,
  } = process.env;

  return {
    type: 'mysql',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    autoLoadEntities: parseBooleanValue(DATABASE_AUTO_LOAD_ENTITIES),
    synchronize: parseBooleanValue(DATABASE_SYNCHRONIZE),
  };
});
