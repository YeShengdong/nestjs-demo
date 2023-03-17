import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './entities';
import { ExamplesService } from './examples.service';
import { ExamplesController } from './examples.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [ExamplesController],
  providers: [ExamplesService],
})
export class ExamplesModule {}
