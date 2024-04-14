import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteResponse {
  @ApiProperty({ example: 'abc-abc' })
  public id: string;

  @ApiProperty({ example: '' })
  public deletedAt: Date;
}
