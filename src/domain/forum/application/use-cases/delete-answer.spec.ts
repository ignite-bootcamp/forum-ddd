import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityID('example-id'));
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: 'example-id',
      authorId: newAnswer.authorId.toString(),
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityID('example-id'));
    await inMemoryAnswersRepository.create(newAnswer);
    const result = await sut.execute({
      answerId: 'example-id',
      authorId: 'wrong-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
