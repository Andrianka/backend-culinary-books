import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  sub!: string;

  @IsNotEmpty()
  email!: string;
}
