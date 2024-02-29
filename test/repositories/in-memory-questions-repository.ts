import { PaginationParams } from '@/domain/forum/application/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question): Promise<void> {
    const filteredItems = this.items.filter(item => item.id !== question.id);
    this.items = filteredItems;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(item => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      item => item.id.toString() === question.id.toString(),
    );
    this.items[questionIndex] = question;
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
