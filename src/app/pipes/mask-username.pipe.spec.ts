import { MaskUsernamePipe } from './mask-username.pipe';

describe('MaskUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new MaskUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
