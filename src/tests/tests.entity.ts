import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Summary } from '../summary/summary.entity';
import { Questions } from '../questions/questions.entity';

@Entity('tests')
export class Tests {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Тест по усвоению документации',
    description: 'Наименование теста',
  })
  @Column({
    nullable: false,
  })
  title: string;

  @ApiProperty({
    example: 'Тест, позволяюшие оценить Ваши знания',
    description: 'Описание теста',
  })
  @Column({
    nullable: false,
  })
  description: string;

  @ApiProperty({ description: 'Время создания теста' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dt: Date;

  @OneToMany(() => Summary, (summary) => summary)
  summary: Summary[];

  @ManyToMany(() => Questions)
  @JoinTable()
  questions: Questions[];
}
