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
}
