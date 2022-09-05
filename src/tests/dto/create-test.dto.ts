import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({
    example: 'Тест для сотрудников здравохранения',
    description: 'Наименование теста',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: 'Тест для проверки базовых знаний',
    description: 'Описание теста',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: '[1,2,4]', description: 'Привязка к вопросам' })
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть массивом чисел', each: true })
  readonly questionsIds?: number[];
}
