import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateTestDto {
    @ApiProperty({example: 'Тест для сотрудников здравохранения', description: 'Наименование теста'})
    @IsString({message: 'Должно быть строкой'})
    readonly title: string;

    @ApiProperty({example: 'Тест для проверки базовых знаний', description: 'Описание теста'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string;

    @ApiProperty({example: '', description: 'Содержимое теста'})
    @IsString({message: 'Должно быть строкой'})
    readonly questions: string;
}