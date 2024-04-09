import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../config/mysqlConfig';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  exports: [MikroOrmModule],
})
export class OrmModule {}
