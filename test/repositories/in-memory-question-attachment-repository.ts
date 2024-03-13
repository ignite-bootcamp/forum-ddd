import { QuestionsAttachmentsRepository } from '@/domain/forum/application/repositories/questions-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

export class InMemoryQuestionAttachmentRepository
  implements QuestionsAttachmentsRepository
{
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    return this.items.filter(item => item.questionId.toString() === questionId);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const itemIndex = this.items.findIndex(
      item => item.questionId.toString() === questionId,
    );
    this.items.splice(itemIndex, 1);
  }
}
