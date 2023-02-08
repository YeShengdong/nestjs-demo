import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

const TAG_NAME = 'Users';
const CONTROLLER_NAME = TAG_NAME.toLocaleLowerCase();

@ApiTags(TAG_NAME)
@Controller(CONTROLLER_NAME)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get(':id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
