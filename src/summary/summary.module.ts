import {Module} from '@nestjs/common';
import {SummaryService} from './summary.service';
import {SummaryController} from './summary.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../roles/roles.entity";
import {User} from "../users/users.entity";
import {Tests} from "../tests/tests.entity";
import {Summary} from "./summary.entity";
import {UsersModule} from "../users/users.module";
import {TestsModule} from "../tests/tests.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Tests, User, Summary]),
        UsersModule,
        TestsModule
    ],
    providers: [SummaryService],
    controllers: [SummaryController]
})
export class SummaryModule {
}
