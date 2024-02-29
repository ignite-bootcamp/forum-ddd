import { Answer } from '../../enterprise/entities/answer';
import { PaginationParams } from './pagination-params';

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  findManyByQuestionId(
    questionId: string,
    param: PaginationParams,
  ): Promise<Answer[]>;
}
