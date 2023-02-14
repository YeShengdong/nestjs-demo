import { OmitType } from '@nestjs/swagger';
import { ExampleDto } from './example.dto';

export class CreateExampleDto extends OmitType(ExampleDto, ['id']) {}
