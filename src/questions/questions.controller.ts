import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Questions } from './questions.entity';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Вопросы')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Создание вопроса' })
  @ApiResponse({ status: 200, type: Questions })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.createQuestion(dto);
  }

  @ApiOperation({ summary: 'Получение вопроса по уникальному идентификатору' })
  @ApiResponse({ status: 200, type: Questions })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:id')
  getById(@Param('id') value: string) {
    return this.questionsService.getQuestionById(value);
  }

  @ApiOperation({ summary: 'Получение всех доступных вопросов' })
  @ApiResponse({ status: 200, type: [Questions] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.questionsService.getAllQuestions();
  }
}
