import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('questions')
export class Questions {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example:
      'Какой из четырех крупнейших спутников Юпитера ближе всего к планете?',
    description: 'Содержимое вопроса',
  })
  @Column({
    nullable: false,
  })
  question: string;

  @ApiProperty({
    example: 'Ио;Европа;Каллисто;Ганимед',
    description: 'Возможные варианты ответа',
  })
  @Column({
    nullable: false,
  })
  answers: string;

  @ApiProperty({ description: 'Правильные ответы' })
  @Column({
    nullable: false,
  })
  correct: string;

  @ApiProperty({ description: 'Время создания вопроса' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dt: Date;
}
