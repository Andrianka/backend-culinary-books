import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  public encode(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public verify(hashedPassword: string, password: string) {
    return argon2.verify(hashedPassword, password);
  }
}
