import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.entity";

@Entity('roles')
export class Role {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Значение роли пользователя'})
    @Column({
            nullable: false,
            unique: true
        }
    )
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({
            nullable: false
        }
    )
    description: string;
}