import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summary } from './summary.entity';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UsersService } from '../users/users.service';
import { TestsService } from '../tests/tests.service';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary) private summaryRepository: Repository<Summary>,
    private usersService: UsersService,
    private testsService: TestsService,
  ) {}

  async createSummary(dto: CreateSummaryDto) {
    const { userId, isSuccess, correct_answers, answers, testId } = dto;
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }

    const test = await this.testsService.getTestById(String(testId));
    if (!test) {
      throw new HttpException('Тест не найден', HttpStatus.NOT_FOUND);
    }

    const summary = this.summaryRepository.create({
      isSuccess,
      correct_answers,
      answers,
    });
    summary.user = user;
    summary.test = test;
    await this.summaryRepository.save(summary);
    return summary;
  }

  async getSummaryByTestId(id: string) {
    const summary = await this.summaryRepository.find({
      relations: ['test', 'user'],
      where: { test: { id: Number(id) } },
    });
    return summary;
  }

  async getSummaryByUserId(id: string) {
    const summary = await this.summaryRepository.find({
      relations: ['test', 'user'],
      where: { user: { id: Number(id) } },
    });
    return summary;
  }

  async getAllSummary() {
    const summary = await this.summaryRepository.find({
      relations: ['user', 'test'],
    });
    return summary;
  }
}
