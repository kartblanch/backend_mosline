import {Module} from '@nestjs/common';
import {TestsService} from './tests.service';
import {TestsController} from './tests.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tests} from "./tests.entity";
import {Summary} from "../summary/summary.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Tests, Summary])],
    providers: [TestsService],
    controllers: [TestsController],
    exports: [TestsService]
})
export class TestsModule {
}
