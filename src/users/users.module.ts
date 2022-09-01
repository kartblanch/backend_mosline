import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Role} from "../roles/roles.entity";
import {RolesModule} from "../roles/roles.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        RolesModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
