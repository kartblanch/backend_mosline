import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from './users/users.module';
import {User} from "./users/users.entity";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.entity";
import {AuthModule} from './auth/auth.module';
import {Tests} from "./tests/tests.entity";
import {TestsModule} from './tests/tests.module';
import { SummaryModule } from './summary/summary.module';
import {Summary} from "./summary/summary.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'oracle',
            host: process.env.ORACLE_HOST,
            port: Number(process.env.ORACLE_PORT),
            username: process.env.ORACLE_USERNAME,
            password: process.env.ORACLE_PASSWORD,
            database: process.env.ORACLE_DATABASE,
            entities: [User, Role, Tests, Summary],
            synchronize: true,
            serviceName: process.env.ORACLE_SERVICE_NAME
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TestsModule,
        SummaryModule,
    ]
})
export class AppModule {
}
