import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { IExampleData } from './examples';

const generateMockData = (number: number) => {
  const data = [];

  // eslint-disable-next-line
  for (let i = 1; i <= number; i++) {
    const item = {
      id: i,
      title: `title-${i}`,
      description: `description-${i}`,
    };

    data.push(item);
  }

  return data;
};

let currentIdIndex = 10;
let mockData: IExampleData[] = generateMockData(currentIdIndex);

@Injectable()
export class ExamplesService {
  create(createExampleDto: CreateExampleDto) {
    currentIdIndex += 1;
    const newRecord = { ...createExampleDto, id: currentIdIndex };

    mockData.push(newRecord);
    return newRecord;
  }

  findAll(): { data: IExampleData[] } {
    return {
      data: mockData,
    };
  }

  findOne(id: number): IExampleData {
    const record = mockData.find(({ id: exampleId }) => exampleId === id);

    if (!record) {
      throw new BadRequestException(40001);
    }

    return record;
  }

  update(id: number, updateExampleDto: UpdateExampleDto): IExampleData {
    let newRecord: IExampleData | null = null;

    mockData = mockData.map((item) => {
      const { id: exampleId } = item;

      if (exampleId === id) {
        newRecord = { ...item, ...updateExampleDto };

        return newRecord;
      }

      return item;
    });

    if (!newRecord) {
      throw new BadRequestException();
    }

    return newRecord;
  }

  remove(id: number): void {
    const remainingData = mockData.filter(
      ({ id: exampleId }) => exampleId !== id,
    );

    if (remainingData.length === mockData.length) {
      throw new BadRequestException();
    }

    mockData = remainingData;
  }
}
