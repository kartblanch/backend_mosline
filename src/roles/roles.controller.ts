import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.entity";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {
    }

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({summary: 'Получение роли по уникальному идентификатору'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }
}
