import { TestBed } from '@angular/core/testing';

import { PormotionService } from './pormotion.service';

describe('PormotionService', () => {
  let service: PormotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PormotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
