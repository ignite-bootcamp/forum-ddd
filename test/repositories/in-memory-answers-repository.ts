import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { PaginationParams } from '@/domain/forum/application/repositories/pagination-params';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer): Promise<void> {
    const filteredItems = this.items.filter(item => item.id !== answer.id);
    this.items = filteredItems;
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find(item => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async save(answer: Answer): Promise<void> {
    const questionIndex = this.items.findIndex(
      item => item.id.toString() === answer.id.toString(),
    );
    this.items[questionIndex] = answer;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}
