import { IsNotEmpty } from 'class-validator';
import { UserRoleType } from '../types';

export class CreateUserDto {
  @IsNotEmpty()
  readonly email!: string;

  @IsNotEmpty()
  readonly password!: string;

  readonly role?: UserRoleType;
}
