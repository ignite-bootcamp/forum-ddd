import { Question } from '../../enterprise/entities/question';
import { PaginationParams } from './pagination-params';

export interface QuestionsRepository {
  delete(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
}
