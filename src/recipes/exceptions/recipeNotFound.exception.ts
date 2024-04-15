import { NotFoundException } from '@nestjs/common';

export class RecipeNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message, {
      cause: new Error(),
      description: 'RECIPE_NOT_FOUND',
    });
  }
}
