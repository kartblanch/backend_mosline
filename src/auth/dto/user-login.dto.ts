import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({example: 'ivanov@mosline.ru', description: 'Корпоративная почта'})
    readonly email: string;
    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    readonly password: string;
}