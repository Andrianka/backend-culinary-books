import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/types/tokenPayload.type';

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  async signToken(payload: TokenPayload, options: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, options);
  }

  async verifyToken(token: string, options: JwtVerifyOptions) {
    return await this.jwtService.verifyAsync(token, options);
  }
}
