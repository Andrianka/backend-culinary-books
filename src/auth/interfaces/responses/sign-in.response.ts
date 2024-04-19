import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({ example: '1a-bb3-3d0dv0' })
  public accessToken: string;
}
