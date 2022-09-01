import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {UserLoginDto} from "./dto/user-login.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async login(userDto: UserLoginDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Сотрудник с такой зарегистрированной почтой существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.usersService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const {email, id, role} = user;
        const payload = {
            email, id, role
        };

        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(userDto: UserLoginDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const isCurrentPassword = await bcrypt.compare(userDto.password, user.password);
        if (user && isCurrentPassword) {
            return user;
        }

        throw new UnauthorizedException({message: 'Некорректные данные авторизации'});
    }
}
