import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    user.role = [role];
    await this.usersRepository.save(user);
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({ relations: ['role'] });
    return this.returnUser(users);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async addRole(roleDto: AddRoleDto) {
    const user = await this.usersRepository.findOneBy({ id: roleDto.userId });
    const role = await this.roleService.getRoleByValue(roleDto.value);
    if (role && user) {
      user.role = [role];
      await this.usersRepository.save(user);
      return user;
    }

    throw new HttpException(
      'Сотрудник или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  returnUser(users: User[]) {
    return users.map((user) => {
      delete user.password;
      delete user.role[0].value;
      delete user.role[0].id;
      return user;
    });
  }
}
