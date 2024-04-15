import { ApiProperty } from '@nestjs/swagger';

export class SimpleRecipeResponse {
  @ApiProperty({ example: 'abc-abc' })
  public id: string;

  @ApiProperty({ example: 'Bread' })
  public title: string;

  @ApiProperty({ example: 'recipe description' })
  public description: string;

  @ApiProperty({ example: true })
  public approved: boolean;
}
