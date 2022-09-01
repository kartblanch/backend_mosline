import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {UserLoginDto} from "./dto/user-login.dto";
import {Tests} from "../tests/tests.entity";

@ApiTags('Авторизация сотрудника / администратора')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Авторизация'})
    @ApiResponse({status: 200})
    @Post('/login')
    login(@Body() userDto: UserLoginDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация сотрудника'})
    @ApiResponse({status: 200})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
