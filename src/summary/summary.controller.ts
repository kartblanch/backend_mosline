import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SummaryService} from "./summary.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Tests} from "../tests/tests.entity";
import {Summary} from "./summary.entity";
import {CreateSummaryDto} from "./dto/create-summary.dto";

@Controller('summary')
export class SummaryController {
    constructor(private summaryService: SummaryService) {
    }

    @ApiOperation({summary: 'Добавление результата прохождения тестирования'})
    @ApiResponse({status: 200, type: Summary})
    @Post()
    create(@Body() dto: CreateSummaryDto) {
        return this.summaryService.createSummary(dto);
    }

    @ApiOperation({summary: 'Получение результатов по уникальному идентификатору теста'})
    @ApiResponse({status: 200, type: [Summary]})
    @Get('/test/:id')
    getByTestId(@Param('id') value: string) {
        return this.summaryService.getSummaryByTestId(value);
    }

    @ApiOperation({summary: 'Получение результатов по уникальному идентификатору пользователя'})
    @ApiResponse({status: 200, type: [Summary]})
    @Get('/user/:id')
    getByUserId(@Param('id') value: string) {
        return this.summaryService.getSummaryByUserId(value);
    }

    @ApiOperation({summary: 'Получение результатов всех пользователей'})
    @ApiResponse({status: 200, type: [Summary]})
    @Get()
    getAllSummary() {
        return this.summaryService.getAllSummary();
    }
}
