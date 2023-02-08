import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common/decorators';
import { LoginDto } from './dto/login.dto';
import { Public } from './constants';

const TAG_NAME = 'Auth';
const CONTROLLER_NAME = TAG_NAME.toLocaleLowerCase();

@ApiTags(TAG_NAME)
@Controller(CONTROLLER_NAME)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
