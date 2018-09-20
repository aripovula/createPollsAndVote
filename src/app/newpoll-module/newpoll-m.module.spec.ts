import { NewpollMModule } from './newpoll-m.module';

describe('NewpollMModule', () => {
  let newpollMModule: NewpollMModule;

  beforeEach(() => {
    newpollMModule = new NewpollMModule();
  });

  it('should create an instance', () => {
    expect(newpollMModule).toBeTruthy();
  });
});
