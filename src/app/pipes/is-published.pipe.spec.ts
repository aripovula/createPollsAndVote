import { IsPublishedPipe } from './is-published.pipe';

describe('IsPublishedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPublishedPipe();
    expect(pipe).toBeTruthy();
  });
});
