import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    /*@ApiOperation({summary: 'Создание сотрудника'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }*/

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200, type: [User]})
    /*@Roles('USER')
    @UseGuards(RolesGuard)*/
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдать роль сотруднику'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() userDto: AddRoleDto) {
        return this.usersService.addRole(userDto);
    }
}
