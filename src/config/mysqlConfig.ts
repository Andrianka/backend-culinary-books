import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mysql';
import { join } from 'path';
import { SeedManager } from '@mikro-orm/seeder';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');

export default defineConfig({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  entities: ['dist/**/entities/*.entity.js'],
  entitiesTs: ['src/**/entities/*.entity.ts'],
  migrations: {
    path: join(__dirname, '../migrations'),
  },
  dbName: 'culinary_book',
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  extensions: [Migrator, EntityGenerator, SeedManager],
});
