import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    example:
      'Какой из четырех крупнейших спутников Юпитера ближе всего к планете?',
    description: 'Содержимое вопроса',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly question: string;

  @ApiProperty({
    example: 'Ио;Европа;Каллисто;Ганимед',
    description: 'Возможные варианты ответа',
  })
  @IsString({ message: 'Должно быть масивом строк', each: true })
  readonly answers: string[];

  @ApiProperty({ example: '[0,1]', description: 'Правильные ответы' })
  @IsNumber({}, { message: 'Должно быть массивом чисел', each: true })
  readonly correct: number[];
}
