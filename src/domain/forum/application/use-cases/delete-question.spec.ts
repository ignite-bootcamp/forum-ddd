import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
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

    expect(() =>
      sut.execute({
        questionId: 'example-id',
        authorId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});