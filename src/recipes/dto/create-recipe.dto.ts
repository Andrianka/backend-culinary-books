import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  readonly title!: string;

  @IsNotEmpty()
  readonly description!: string;
}
