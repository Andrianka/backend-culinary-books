import { BadRequestException } from '@nestjs/common';
import { ErrorEnum } from '../../common/error.enum';

export class UserBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super(message, {
      cause: new Error(),
      description: ErrorEnum.UserBadRequest,
    });
  }
}
