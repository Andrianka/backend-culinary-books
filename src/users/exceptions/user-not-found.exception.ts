import { NotFoundException } from '@nestjs/common';
import { ErrorEnum } from '../../common/error.enum';

export class UserNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message, {
      cause: new Error(),
      description: ErrorEnum.UserNotFound,
    });
  }
}
