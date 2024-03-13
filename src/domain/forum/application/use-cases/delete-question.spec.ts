import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('example-id'));
    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: 'example-id',
      authorId: newQuestion.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('example-id'));
    await inMemoryQuestionsRepository.create(newQuestion);
    const result = await sut.execute({
      questionId: 'example-id',
      authorId: 'wrong-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
