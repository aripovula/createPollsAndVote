import { IsNotExpiredPipe } from './is-not-expired.pipe';

describe('IsNotExpiredPipe', () => {
  it('create an instance', () => {
    const pipe = new IsNotExpiredPipe();
    expect(pipe).toBeTruthy();
  });
});
