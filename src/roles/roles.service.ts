import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(dto);
      await this.roleRepository.save(role);
      return role;
    } catch (e) {
      throw new HttpException(
        `Роль ${dto.value} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new HttpException(`Роль ${value} не найдена`, HttpStatus.NOT_FOUND);
    }

    return role;
  }
}
