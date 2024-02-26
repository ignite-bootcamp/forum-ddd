import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';

const fakeAnswerRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async answer => {},
};

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);
  const { answer } = await answerQuestion.execute({
    content: 'Nova questão',
    instructorId: '1',
    questionId: '1',
  });

  expect(answer.content).toEqual('Nova questão');
});
