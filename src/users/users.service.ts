import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
                private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = this.usersRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        user.role = [role];
        await this.usersRepository.save(user);
        return user;
    }

    async getAllUsers() {
        const users = this.usersRepository.find({relations: ['role']});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({where: {email}, relations: ['role']});
        return user;
    }
}
