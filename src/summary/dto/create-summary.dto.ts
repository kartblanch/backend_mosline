import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateSummaryDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пройденного теста'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly testId: number;

    @ApiProperty({example: '', description: 'Ответы пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly answers: string;

    @ApiProperty({example: '', description: 'Количество правильных ответов'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly correct_answers: number;

    @ApiProperty({example: '', description: 'Пройден ли тест'})
    @IsBoolean({message: 'Должно быть булиевым значением'})
    readonly isSuccess: boolean;
}