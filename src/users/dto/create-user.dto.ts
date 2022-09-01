import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Ивинов Иван Иванович', description: 'Полное имя пользователя'})
    readonly fullName: string;
    @ApiProperty({example: 'Сотрудник', description: 'Должность'})
    readonly position: string;
    @ApiProperty({example: 'ivanov@mosline.ru', description: 'Корпоративная почта'})
    readonly email: string;
    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    readonly password: string;
}