import { EntityRepository } from '@mikro-orm/mysql';
import { wrap } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDeleteResponse } from './interfaces/responses/userDelete.response';

export class UserRepository extends EntityRepository<User> {
  async findByEmail(email: string, filters?): Promise<User> {
    this.getFilter(filters);
    const user = await this.findOne(
      { email },
      {
        filters,
      },
    );
    if (!user) {
      throw new HttpException(
        {
          message: 'Not Found',
          errors: { user: 'Not found' },
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async getById(id: string, filters?): Promise<User> {
    this.getFilter(filters);
    const user = await this.findOne(
      { id },
      {
        filters,
      },
    );

    if (!user) {
      throw new HttpException(
        {
          message: 'Not Found',
          errors: { user: 'Not found' },
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = new User();
    user.email = email;
    user.password = password;
    await this.em.persistAndFlush(user);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { username: 'Userinput is not valid.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.em.persistAndFlush(user);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneOrFail({ id });
    wrap(user).assign(updateUserDto);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { username: 'Userinput is not valid.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.em.persistAndFlush(user);
    }
    return user;
  }

  async softDelete(id: string): Promise<UserDeleteResponse> {
    const user = await this.findOneOrFail({ id });
    user.deletedAt = new Date();
    await this.em.persistAndFlush(user);
    return {
      id,
      deletedAt: user.deletedAt,
    };
  }

  async restoreUser(id: string) {
    const existingUser = await this.getById(id, {
      softDelete: { getOnlyDeleted: true },
    });
    existingUser.deletedAt = null;
    await this.em.persistAndFlush(existingUser);
    return existingUser;
  }

  private getFilter(filters) {
    filters = Object.keys(filters)
      ? {
          softDelete: {},
        }
      : filters;
    return filters;
  }
}
