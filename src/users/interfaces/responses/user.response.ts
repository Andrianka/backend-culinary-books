import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserRoleType } from '../../types';

export class UserResponse {
  @ApiProperty({ example: 'abc-abc' })
  public id: string;

  @ApiProperty({ example: 'test@mail.com' })
  public email: string;

  @ApiProperty({ example: UserRole.ADMIN })
  public role: UserRoleType;
}
