import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TestsService} from "./tests.service";
import {CreateTestDto} from "./dto/create-test.dto";
import {Tests} from "./tests.entity";

@ApiTags('Тесты')
@Controller('tests')
export class TestsController {
    constructor(private testsService: TestsService) {
    }

    @ApiOperation({summary: 'Создание теста'})
    @ApiResponse({status: 200, type: Tests})
    @Post()
    create(@Body() dto: CreateTestDto) {
        return this.testsService.createTest(dto);
    }

    @ApiOperation({summary: 'Получение теста по уникальному идентификатору'})
    @ApiResponse({status: 200, type: Tests})
    @Get('/:id')
    getById(@Param('id') value: string) {
        return this.testsService.getTestById(value);
    }
}
