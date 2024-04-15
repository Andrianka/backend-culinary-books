import { BadRequestException } from '@nestjs/common';

export class RecipeBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super(message, {
      cause: new Error(),
      description: 'RECIPE_BAD_REQUEST',
    });
  }
}
