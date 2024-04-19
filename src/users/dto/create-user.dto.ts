import { IsNotEmpty } from 'class-validator';
import { UserRoleType } from '../types';

export class CreateUserDto {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  role?: UserRoleType;
}
