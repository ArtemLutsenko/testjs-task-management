import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '123',
  database: 'task-management',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;
