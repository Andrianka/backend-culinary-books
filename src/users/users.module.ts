import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserTransformer } from './transformers/user.transformer';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [UsersController],
  providers: [UsersService, UserTransformer],
  exports: [UsersService],
})
export class UsersModule {}
