import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Media } from '../../medias/entities/media.entity';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @IsNotEmpty()
  readonly approved?: boolean;

  @IsString()
  readonly categoryName?: string;

  readonly media: Media;
}
