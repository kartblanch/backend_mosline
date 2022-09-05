import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../../roles/roles.entity';
import { User } from '../../users/users.entity';
import * as bcrypt from 'bcryptjs';

export class initMigration1662406429927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role = await queryRunner.manager.create<Role>(Role, {
      value: 'ADMIN',
      description: 'Администратор',
    });

    await queryRunner.manager.save(role);

    const hashPassword = await bcrypt.hash('223322', 10);
    const userAdmin = await queryRunner.manager.create<User>(User, {
      fullName: 'Admin',
      position: 'Начальник',
      email: 'admin@mail.ru',
      password: hashPassword,
    });

    userAdmin.role = [role];

    await queryRunner.manager.save(userAdmin);
  }

  //todo: здесь должна быть логика при откате миграции
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SELECT COUNT(*) FROM "SYSTEM"."users"');
  }
}
