import { Either, left, right } from '@/core/either';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, object>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      throw left('Answer comment not found.');
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw left('Not allowed');
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
