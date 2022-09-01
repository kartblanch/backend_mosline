import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.entity";
import {Summary} from "../summary/summary.entity";

@Entity('users')
export class User {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    @Column({
            nullable: false
        }
    )
    password: string;

    @ApiProperty({example: 'Ивинов Иван Иванович', description: 'Полное имя пользователя'})
    @Column({
            nullable: false
        }
    )
    fullName: string;

    @ApiProperty({example: 'ivanov@mosline.ru', description: 'Корпоративная почта'})
    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @ApiProperty({example: 'Сотрудник', description: 'Должность'})
    @Column({default: 'user'})
    position: string;

    @ManyToMany(() => Role)
    @JoinTable()
    role: Role[];

    @OneToMany(() => Summary, (summary) => summary)
    summary: Summary[];
}