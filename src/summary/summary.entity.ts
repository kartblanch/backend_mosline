import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column} from 'typeorm';
import {User} from "../users/users.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Tests} from "../tests/tests.entity";

@Entity('summary')
export class Summary {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: User, description: 'Пользователь'})
    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ApiProperty({example: Tests, description: 'Тест'})
    @OneToOne(() => Tests)
    @JoinColumn()
    test: Tests;

    @ApiProperty({example: '', description: 'Ответы пользователя'})
    @Column({
        nullable: false
    })
    answers: string;

    @ApiProperty({example: '5', description: 'Количество верных ответов'})
    @Column({
        nullable: false
    })
    correct_answers: number;

    @ApiProperty({example: 'false', description: 'Пройден ли тест'})
    @Column({
        nullable: false
    })
    isSuccess: boolean;

    @ApiProperty({description: 'Время окончания выполнения теста'})
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    dt: Date;
}