import { BadRequestException } from '@nestjs/common';

export class CategoryBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super(message, {
      cause: new Error(),
      description: 'CATEGORY_BAD_REQUEST',
    });
  }
}
