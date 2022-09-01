import {Module} from '@nestjs/common';
import {RolesController} from './roles.controller';
import {RolesService} from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import {Role} from "./roles.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Role, User])],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService]
})
export class RolesModule {
}
