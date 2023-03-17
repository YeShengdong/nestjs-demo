import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

const TAG_NAME = 'Users';
const CONTROLLER_PATH = TAG_NAME.toLocaleLowerCase();

@ApiTags(TAG_NAME)
@ApiBearerAuth()
@Controller(CONTROLLER_PATH)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
