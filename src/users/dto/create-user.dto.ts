import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'Ивинов Иван Иванович', description: 'Полное имя пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly fullName: string;

    @ApiProperty({example: 'Сотрудник', description: 'Должность'})
    @IsString({message: 'Должно быть строкой'})
    readonly position: string;

    @ApiProperty({example: 'ivanov@mosline.ru', description: 'Корпоративная почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректная почта'})
    readonly email: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(6, 16, {message: 'Пароль должен быть от 6 до 16 символов'})
    readonly password: string;
}