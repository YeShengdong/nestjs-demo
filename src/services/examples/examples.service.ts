import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Example } from './entities';

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  create(createExampleDto: CreateExampleDto): Promise<Example> {
    return this.exampleRepository.save(createExampleDto);
  }

  async findAll(): Promise<{ data: Example[] }> {
    const data = await this.exampleRepository.find();

    return {
      data,
    };
  }

  async findOne(id: number): Promise<Example> {
    const data = await this.exampleRepository.findOneBy({ id });

    if (!data) {
      throw new BadRequestException(40001);
    }

    return data;
  }

  async update(
    id: number,
    updateExampleDto: UpdateExampleDto,
  ): Promise<Example> {
    await this.exampleRepository.update({ id }, updateExampleDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.exampleRepository.delete(id);
  }
}
