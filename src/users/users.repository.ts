import { EntityRepository } from '@mikro-orm/mysql';
import { wrap } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDeleteResponse } from './interfaces/responses/userDelete.response';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserBadRequestException } from './exceptions/user-bad-request.exception';

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
      throw new UserNotFoundException();
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
      throw new UserNotFoundException();
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
      throw new UserBadRequestException('Input data validation failed');
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
      throw new UserBadRequestException('Input data validation failed');
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
