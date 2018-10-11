import { CountQuestionsPipe } from './count-questions.pipe';

describe('CountQuestionsPipe', () => {
  it('create an instance', () => {
    const pipe = new CountQuestionsPipe();
    expect(pipe).toBeTruthy();
  });
});
