import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: 'localhost',
  port: 1521,
  username: 'system',
  password: 'MyPasswd123',
  database: 'OraDoc',
  serviceName: 'OraDoc.my.domain.com',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
});
