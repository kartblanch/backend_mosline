import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Tests } from './tests.entity';
import { AddQuestionsDto } from './dto/add-questions.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Тесты')
@Controller('tests')
export class TestsController {
  constructor(private testsService: TestsService) {}

  @ApiOperation({ summary: 'Создание теста' })
  @ApiResponse({ status: 200, type: Tests })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateTestDto) {
    return this.testsService.createTest(dto);
  }

  @ApiOperation({ summary: 'Получение теста по уникальному идентификатору' })
  @ApiResponse({ status: 200, type: Tests })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:id')
  getById(@Param('id') value: string) {
    return this.testsService.getTestById(value);
  }

  @ApiOperation({ summary: 'Получение всех доступных тестов' })
  @ApiResponse({ status: 200, type: [Tests] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.testsService.getAllTests();
  }

  @ApiOperation({ summary: 'Добавление вопросов к тесту по его Id' })
  @ApiResponse({ status: 200, type: Tests })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/add-questions')
  addQuestions(@Body() dto: AddQuestionsDto) {
    return this.testsService.addQuestionsToTestById(dto);
  }
}
