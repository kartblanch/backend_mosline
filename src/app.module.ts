import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import {User} from "./users/users.entity";
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.entity";
import { AuthModule } from './auth/auth.module';

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
            entities: [User, Role],
            synchronize: true,
            serviceName: process.env.ORACLE_SERVICE_NAME
        }),
        UsersModule,
        QuestionsModule,
        AnswersModule,
        RolesModule,
        AuthModule,
    ]
})
export class AppModule {
}
