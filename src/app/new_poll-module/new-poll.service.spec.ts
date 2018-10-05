import { TestBed, inject } from '@angular/core/testing';

import { NewPollService } from './new-poll.service';

describe('NewPollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewPollService]
    });
  });

  it('should be created', inject([NewPollService], (service: NewPollService) => {
    expect(service).toBeTruthy();
  }));
});
