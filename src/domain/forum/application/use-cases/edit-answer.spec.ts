import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityID('example-id'));
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: newAnswer.authorId.toValue(),
      answerId: newAnswer.id.toString(),
      content: 'new-content',
    });

    expect(inMemoryAnswersRepository.items[0].content).toEqual('new-content');
  });

  it('should not be able to edit a answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityID('example-id'));
    await inMemoryAnswersRepository.create(newAnswer);

    expect(() =>
      sut.execute({
        authorId: newAnswer.authorId.toValue(),
        answerId: 'wrong-id',
        content: newAnswer.content,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
