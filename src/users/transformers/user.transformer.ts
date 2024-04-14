import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserResponse } from '../interfaces/responses/user.response';

@Injectable()
export class UserTransformer {
  public constructor() {}

  public transform(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  public transformAllUsers(users: User[]): UserResponse[] {
    return users?.map((user) => this.transform(user));
  }
}
