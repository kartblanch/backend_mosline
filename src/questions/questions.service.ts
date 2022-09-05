import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Questions } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    const question = this.questionRepository.create({
      ...dto,
      ...{ correct: dto.correct.join(','), answers: dto.answers.join(',') },
    });

    await this.questionRepository.save(question);
    return question;
  }

  async getQuestionById(id: string) {
    const question = await this.questionRepository.findOne({
      where: { id: Number(id) },
    });
    if (question) {
      return {
        ...question,
        ...{
          answers: question.answers.split(','),
          correct: question.correct.split(','),
        },
      };
    }

    throw new HttpException(
      'Такого вопроса не существует',
      HttpStatus.NOT_FOUND,
    );
  }

  async getAllQuestions() {
    const questions = await this.questionRepository.find();
    return questions.map((question) => {
      return {
        ...question,
        ...{
          answers: question.answers.split(','),
          correct: question.correct.split(','),
        },
      };
    });
  }

  async getQuestionByIds(ids: number[]) {
    const questions = await this.questionRepository.findBy({ id: In(ids) });
    if (questions.length === 0) {
      throw new HttpException(
        'Перечисленные вопросы не найдены',
        HttpStatus.NOT_FOUND,
      );
    }

    return questions;
  }
}
