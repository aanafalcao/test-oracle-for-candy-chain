import { TestBed, inject } from '@angular/core/testing';

import { HTTPrequestService } from './httprequest.service';

describe('HTTPrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HTTPrequestService]
    });
  });

  it('should be created', inject([HTTPrequestService], (service: HTTPrequestService) => {
    expect(service).toBeTruthy();
  }));
});
