import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message, {
      cause: new Error(),
      description: 'CATEGORY_NOT_FOUND',
    });
  }
}
