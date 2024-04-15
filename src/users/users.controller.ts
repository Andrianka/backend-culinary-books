import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTransformer } from './transformers/user.transformer';
import { UserResponse } from './interfaces/responses/user.response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userTransformer: UserTransformer,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return this.userTransformer.transform(user);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return this.userTransformer.transformAllUsers(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.usersService.getById(id);
    return this.userTransformer.transform(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return this.userTransformer.transform(user);
  }

  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @Patch(':id')
  async restore(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.usersService.restoreUser(id);
    return this.userTransformer.transform(user);
  }
}
