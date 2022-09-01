import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'USER', description: 'Роль сотрудника'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;

    @ApiProperty({example: '1', description: 'ID сотрудника'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number;
}