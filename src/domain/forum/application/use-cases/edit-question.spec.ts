import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('example-id'));
    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      questionId: newQuestion.id.toString(),
      content: newQuestion.content,
      title: 'edited-title',
    });

    expect(inMemoryQuestionsRepository.items[0].title).toEqual('edited-title');
  });

  it('should not be able to edit a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('example-id'));
    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() =>
      sut.execute({
        authorId: newQuestion.authorId.toValue(),
        questionId: 'wrong-id',
        content: newQuestion.content,
        title: newQuestion.title,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
