import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {Role} from "../roles/roles.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Summary} from "../summary/summary.entity";

@Entity('tests')
export class Tests {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Тест по усвоению документации', description: 'Наименование теста'})
    @Column({
            nullable: false
        }
    )
    title: string;

    @ApiProperty({example: 'Тест, позволяюшие оценить Ваши знания', description: 'Описание теста'})
    @Column({
        nullable: false
    })
    description: string;

    @ApiProperty({description: 'Содержание теста'})
    @Column({
        nullable: false
    })
    questions: string;

    @ApiProperty({ description: 'Время создания теста'})
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    dt: Date;

    @OneToMany(() => Summary, (summary) => summary)
    summary: Summary[];
}