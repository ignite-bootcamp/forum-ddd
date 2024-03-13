import { QuestionsAttachmentsRepository } from '@/domain/forum/application/repositories/questions-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

export class InMemoryQuestionAttachmentRepository
  implements QuestionsAttachmentsRepository
{
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    return this.items.filter(item => item.questionId.toString() === questionId);
  }
}
