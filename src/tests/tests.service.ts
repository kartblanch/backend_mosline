import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tests } from './tests.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { QuestionsService } from '../questions/questions.service';
import { AddQuestionsDto } from './dto/add-questions.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Tests) private testRepository: Repository<Tests>,
    private questionsService: QuestionsService,
  ) {}

  async createTest(dto: CreateTestDto) {
    const test = this.testRepository.create(dto);
    if (dto.questionsIds) {
      const questionsCandidate = await this.questionsService.getQuestionByIds(
        dto.questionsIds,
      );
      test.questions = questionsCandidate;
    }

    await this.testRepository.save(test);
    return test;
  }

  async getTestById(id: string) {
    const test = await this.testRepository.findOne({
      relations: ['questions'],
      where: { id: Number(id) },
    });
    if (test) {
      return test;
    }

    throw new HttpException('Такого теста не существует', HttpStatus.NOT_FOUND);
  }

  async getAllTests() {
    const tests = await this.testRepository.find({ relations: ['questions'] });
    return tests;
  }

  async addQuestionsToTestById(dto: AddQuestionsDto) {
    const { testId, questionsIds } = dto;
    const testCandidate = await this.getTestById(String(testId));
    const questionsCandidate = await this.questionsService.getQuestionByIds(
      questionsIds,
    );
    testCandidate.questions = [
      ...testCandidate.questions,
      ...questionsCandidate,
    ];
    await this.testRepository.save(testCandidate);
    return testCandidate;
  }
}
