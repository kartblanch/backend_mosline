import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SummaryService } from './summary.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Summary } from './summary.entity';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Результаты тестирования')
@Controller('summary')
export class SummaryController {
  constructor(private summaryService: SummaryService) {}

  @ApiOperation({ summary: 'Добавление результата прохождения тестирования' })
  @ApiResponse({ status: 200, type: Summary })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSummaryDto) {
    return this.summaryService.createSummary(dto);
  }

  @ApiOperation({
    summary: 'Получение результатов по уникальному идентификатору теста',
  })
  @ApiResponse({ status: 200, type: [Summary] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/test/:id')
  getByTestId(@Param('id') id: string) {
    return this.summaryService.getSummaryByTestId(id);
  }

  @ApiOperation({
    summary: 'Получение результатов по уникальному идентификатору пользователя',
  })
  @ApiResponse({ status: 200, type: [Summary] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/user/:id')
  getByUserId(@Param('id') value: string) {
    return this.summaryService.getSummaryByUserId(value);
  }

  @ApiOperation({ summary: 'Получение результатов текущего пользователя' })
  @ApiResponse({ status: 200, type: [Summary] })
  @UseGuards(JwtAuthGuard)
  @Get('/current-user')
  getByCurrentId(@Req() request) {
    return this.summaryService.getSummaryByUserId(String(request.user.id));
  }

  @ApiOperation({ summary: 'Получение результатов всех пользователей' })
  @ApiResponse({ status: 200, type: [Summary] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllSummary() {
    return this.summaryService.getAllSummary();
  }
}
