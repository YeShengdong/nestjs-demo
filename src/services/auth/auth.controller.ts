import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Public } from './constants';
import { LocalAuthGuard } from './local-auth.guard';

const TAG_NAME = 'Auth';
const CONTROLLER_PATH = TAG_NAME.toLocaleLowerCase();

@ApiTags(TAG_NAME)
@Controller(CONTROLLER_PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
