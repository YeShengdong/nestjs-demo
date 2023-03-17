import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ExamplesService } from './examples.service';
import { ExampleDto, CreateExampleDto, UpdateExampleDto } from './dto';

const TAG_NAME = 'Examples';
const CONTROLLER_PATH = TAG_NAME.toLocaleLowerCase();

@ApiTags(TAG_NAME)
@ApiBearerAuth()
@Controller({
  path: CONTROLLER_PATH,
})
export class ExamplesController {
  constructor(private readonly examplesService: ExamplesService) {}

  @ApiOperation({ summary: 'Create example' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.examplesService.create(createExampleDto);
  }

  @ApiOperation({ summary: 'Get all examples' })
  @ApiOkResponse({ type: [ExampleDto] })
  @Get()
  findAll() {
    return this.examplesService.findAll();
  }

  @ApiOperation({ summary: 'Get example' })
  @ApiOkResponse({ type: ExampleDto })
  @ApiNotFoundResponse({ description: 'Example not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examplesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update example' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return this.examplesService.update(id, updateExampleDto);
  }

  @ApiOperation({ summary: 'Delete example' })
  @ApiOkResponse({
    description: 'The record has been successfully removed.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examplesService.remove(id);
  }
}
