import {
  Body,
  Request,
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@CurrentUser() user: UserDto, @Body() refreshDto: RefreshDto) {
    return this.authService.refreshTokens(user.sub, refreshDto);
  }

  @Get('logout')
  @ApiTags('Authentication')
  @ApiOperation({ description: 'Logout' })
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: any, @CurrentUser() user: UserDto) {
    await this.authService.logout(user.sub);
    req.res.setHeader('Authorization', null);
  }
}
