import { TestBed } from '@angular/core/testing';

import { UserPersonalDetailsService } from './user-personal-details.service';

describe('UserPersonalDetailsService', () => {
  let service: UserPersonalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPersonalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
