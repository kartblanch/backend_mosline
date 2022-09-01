import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Tests} from "./tests.entity";
import {CreateTestDto} from "./dto/create-test.dto";

@Injectable()
export class TestsService {
    constructor(@InjectRepository(Tests) private testRepository: Repository<Tests>) {
    }

    async createTest(dto: CreateTestDto) {
        /*const a =
            {
                questions: [
                    {
                        question: '5 + 5 ?',
                        answers: ['10', '12', '13'],
                        correct: [0]
                    },
                    {
                        question: '9 + 5 ?',
                        answers: ['10', '14', '13'],
                        correct: [1]
                    }
                ]
            };*/

        const test = this.testRepository.create(dto);
        await this.testRepository.save(test);
        return test;
    }

    async getTestById(id: string) {
        const test = await this.testRepository.findOne({where: {id: Number(id)}});
        if (test) {
            test.questions = JSON.parse(test.questions);
            return test;
        }

        throw new HttpException('Такого теста не существует', HttpStatus.NOT_FOUND);
    }
}
