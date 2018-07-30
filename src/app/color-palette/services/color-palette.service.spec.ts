import { TestBed, inject } from '@angular/core/testing';

import { ColorPaletteService } from './color-palette.service';

describe('ColorPaletteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorPaletteService]
    });
  });

  it('should be created', inject(
    [ColorPaletteService],
    (service: ColorPaletteService) => {
      expect(service).toBeTruthy();
    }
  ));
});
