import { GetPollNameForQuestionPipe } from './get-poll-name-for-question.pipe';

describe('GetPollNameForQuestionPipe', () => {
  it('create an instance', () => {
    const pipe = new GetPollNameForQuestionPipe();
    expect(pipe).toBeTruthy();
  });
});
