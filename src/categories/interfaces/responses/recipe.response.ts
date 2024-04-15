import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponse {
  @ApiProperty({ example: 'category name' })
  public name: string;

  @ApiProperty({ example: true })
  public isActive: boolean;
}
