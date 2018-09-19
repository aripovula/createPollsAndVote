import { VoteMModule } from './vote-m.module';

describe('VoteMModule', () => {
  let voteMModule: VoteMModule;

  beforeEach(() => {
    voteMModule = new VoteMModule();
  });

  it('should create an instance', () => {
    expect(voteMModule).toBeTruthy();
  });
});
