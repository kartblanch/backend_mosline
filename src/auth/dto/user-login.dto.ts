import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'ivanov@mosline.ru',
    description: 'Корпоративная почта',
  })
  @IsEmail({}, { message: 'Некорректная почта' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(6, 16, { message: 'Пароль должен быть от 6 до 16 символов' })
  readonly password: string;
}
