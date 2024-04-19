import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignInResponse } from './interfaces/responses/sign-in.response';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthJwtService } from './jwt.service';
import { SignUpResponse } from './interfaces/responses/sign-up.response';

import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';
import { User } from '../users/entities/user.entity';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: AuthJwtService,
    private passwordService: PasswordService,
    private config: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(signInDto.email);

    const passwordMatches = await this.passwordService.verify(
      user.password,
      signInDto.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    return {
      accessToken: await this.createAccessToken({ user }),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponse> {
    const user = await this.usersService.createUser(signUpDto);
    const tokens = await this.generateTokens(user);
    await this.usersService.updateUser(user.id, {
      refreshHashToken: await this.passwordService.encode(tokens.refreshToken),
    });
    return {
      ...tokens,
    };
  }

  async refreshTokens(userId: string, refreshDto: RefreshDto): Promise<Tokens> {
    const { refreshToken } = refreshDto;
    const user = await this.usersService.getById(userId);

    if (!user || refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const checkedRefreshToken = this.checkRefreshToken(user, refreshToken);

    if (!checkedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user);
    await this.usersService.updateUser(user.id, {
      refreshHashToken: await this.passwordService.encode(refreshToken),
    });
    return { ...tokens };
  }

  async logout(userId: string) {
    return this.usersService.updateUser(userId, { refreshHashToken: null });
  }

  private async generateTokens(user): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken({ user }),
      this.createRefreshToken({ user }),
    ]);

    return { accessToken, refreshToken };
  }

  private createAccessToken({ user }): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signToken(payload, {
      secret: this.config.get('jwt_access_secret'),
      expiresIn: this.config.get('jwt_access_life_time') * 60,
    });
  }

  private createRefreshToken({ user }): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signToken(payload, {
      secret: this.config.get('jwt_refresh_secret'),
      expiresIn: this.config.get('jwt_refresh_life_time') * 24 * 60 * 60,
    });
  }

  private async checkRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<boolean> {
    const verifyRefreshHash = await this.passwordService.verify(
      user.refreshHashToken,
      refreshToken,
    );
    const verifyRefreshToken = await this.jwtService.verifyToken(refreshToken, {
      secret: this.config.get('jwt_refresh_secret'),
    });
    return verifyRefreshHash && verifyRefreshToken;
  }
}
