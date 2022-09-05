import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddQuestionsDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор созданного теста',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly testId: number;

  @ApiProperty({ example: '[1,2]', description: 'IDs созданных вопросов' })
  @IsNumber({}, { message: 'Должно быть массивом чисел', each: true })
  readonly questionsIds: number[];
}
