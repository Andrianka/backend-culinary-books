import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponse {
  @ApiProperty({ example: '1a-bb3-3d0dv0' })
  public accessToken: string;

  @ApiProperty({ example: '1a-bb3-3d0dv0' })
  public refreshToken: string;
}
