import { NotFoundException } from '@nestjs/common';
import { ErrorEnum } from '../../common/error.enum';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(ErrorEnum.UserNotFound);
  }
}