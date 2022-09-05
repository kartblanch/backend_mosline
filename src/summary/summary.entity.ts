import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Tests } from '../tests/tests.entity';

@Entity('summary')
export class Summary {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Tests, (test) => test)
  test: Tests;

  @ApiProperty({ example: '', description: 'Ответы пользователя' })
  @Column({
    nullable: false,
  })
  answers: string;

  @ApiProperty({ example: '5', description: 'Количество верных ответов' })
  @Column({
    nullable: false,
  })
  correct_answers: number;

  @ApiProperty({ example: 'false', description: 'Пройден ли тест' })
  @Column({
    nullable: false,
  })
  isSuccess: boolean;

  @ApiProperty({ description: 'Время окончания выполнения теста' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dt: Date;
}
