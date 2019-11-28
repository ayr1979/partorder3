/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartsListService } from './parts-list.service';

describe('Service: PartsList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartsListService]
    });
  });

  it('should ...', inject([PartsListService], (service: PartsListService) => {
    expect(service).toBeTruthy();
  }));
});
