import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import environment from './environment';

const ormconfig = {
  type: 'postgres',
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  synchronize: environment.DB_SYNC,
  logging: environment.DB_LOGS,
  migrationsRun: true,
  entities: [path.resolve(__dirname, '/components/**/entities/**/*{.ts,.js}')],
  migrations: [
    path.resolve(__dirname, '/components/**/migrations/**/*{.ts,.js}'),
  ],
} as DataSourceOptions;

export default new DataSource(ormconfig);