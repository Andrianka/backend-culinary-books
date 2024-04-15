import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { UserDeleteResponse } from './interfaces/responses/userDelete.response';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { email: 'Email must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.createUser({
      email,
      password,
      role,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async softDelete(id: string): Promise<UserDeleteResponse> {
    return this.userRepository.softDelete(id);
  }

  async restoreUser(id: string): Promise<User> {
    return this.userRepository.restoreUser(id);
  }
}
