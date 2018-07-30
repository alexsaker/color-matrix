import { TestBed, inject } from '@angular/core/testing';

import { ColorMatrixService } from './color-matrix.service';

describe('ColorMatrixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorMatrixService]
    });
  });

  it('should be created', inject(
    [ColorMatrixService],
    (service: ColorMatrixService) => {
      expect(service).toBeTruthy();
    }
  ));
});
