import { DataSource } from 'typeorm';
import { Policyholders } from './entities/policyholders.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'mydb.sql',
  entities: [Policyholders],
  synchronize: true,
});
