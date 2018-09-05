import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { range } from 'lodash';

import { ColorPaletteService } from '../services/color-palette.service';
import { FontWeight } from './../enums/font-weight.enum';
import { SetSelectedMatrix } from './color-palette.actions';
import {
  ColorPaletteState,
  DEFAULT_COLOR_PALETTE_STATE,
  RANGE_END,
  RANGE_START
} from './color-palette.state';

const fakeColorPaletteSate = {
  ids: ['123', '456'],
  entities: {
    '123': { id: '123', title: 'test1', data: ['#123', '#456'] },
    '456': { id: '456', title: 'test2', data: ['#789', '#123'] }
  },
  error: new Error('my Error'),
  selected: '123',
  selectedMatrix: { size: 15, fontWeight: FontWeight.FIVE_HUNDRED },
  sizes: range(RANGE_START, RANGE_END),
  fontWeights: [
    FontWeight.LIGHTER,
    FontWeight.NORMAL,
    FontWeight.BOLD,
    FontWeight.BOLDER,
    FontWeight.ONE_HUNDRED,
    FontWeight.TWO_HUNDRED,
    FontWeight.THREE_HUNDRED,
    FontWeight.FOUR_HUNDRED,
    FontWeight.FIVE_HUNDRED,
    FontWeight.SIX_HUNDRED,
    FontWeight.SEVEN_HUNDRED,
    FontWeight.EIGHT_HUNDRED,
    FontWeight.NINE_HUNDRED
  ]
};

describe('ColorPaletteState', () => {
  let router: Router;
  let store: Store;
  let colorPaletteService: ColorPaletteService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ColorPaletteState]),
        RouterTestingModule.withRoutes([])
      ],
      providers: [Store, ColorPaletteService]
    });
    store = TestBed.get(Store);
    store.reset(DEFAULT_COLOR_PALETTE_STATE);
    colorPaletteService = TestBed.get(ColorPaletteService);
    router = TestBed.get(Router);
  });
  describe('Select', () => {
    it('Should set default state', async () => {
      store.selectOnce(state => state).subscribe(state => {
        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
        expect(state.error).toEqual(null);
        expect(state.selected).toEqual(null);
        expect(state.selectedMatrix).toEqual({
          size: 12,
          fontWeight: FontWeight.NORMAL
        });
        expect(state.sizes).toEqual(range(RANGE_START, RANGE_END));
        expect(state.fontWeights).toEqual([
          FontWeight.LIGHTER,
          FontWeight.NORMAL,
          FontWeight.BOLD,
          FontWeight.BOLDER,
          FontWeight.ONE_HUNDRED,
          FontWeight.TWO_HUNDRED,
          FontWeight.THREE_HUNDRED,
          FontWeight.FOUR_HUNDRED,
          FontWeight.FIVE_HUNDRED,
          FontWeight.SIX_HUNDRED,
          FontWeight.SEVEN_HUNDRED,
          FontWeight.EIGHT_HUNDRED,
          FontWeight.NINE_HUNDRED
        ]);
      });
    });

    it('Should select color palettes list', async () => {
      const expectedResult = [
        { id: '123', title: 'test1', data: ['#123', '#456'] },
        { id: '456', title: 'test2', data: ['#789', '#123'] }
      ];
      expect(ColorPaletteState.colorPalettes(fakeColorPaletteSate)).toEqual(
        expectedResult
      );
    });
    it('Should select color palettes sizes', async () => {
      const expectedResult = range(RANGE_START, RANGE_END);
      expect(ColorPaletteState.colorPaletteSizes(fakeColorPaletteSate)).toEqual(
        expectedResult
      );
    });
    it('Should select color palettes font weights', async () => {
      const expectedResult = [
        FontWeight.LIGHTER,
        FontWeight.NORMAL,
        FontWeight.BOLD,
        FontWeight.BOLDER,
        FontWeight.ONE_HUNDRED,
        FontWeight.TWO_HUNDRED,
        FontWeight.THREE_HUNDRED,
        FontWeight.FOUR_HUNDRED,
        FontWeight.FIVE_HUNDRED,
        FontWeight.SIX_HUNDRED,
        FontWeight.SEVEN_HUNDRED,
        FontWeight.EIGHT_HUNDRED,
        FontWeight.NINE_HUNDRED
      ];
      expect(
        ColorPaletteState.colorPaletteFontWeights(fakeColorPaletteSate)
      ).toEqual(expectedResult);
    });
    it('Should select color palettes ids', async () => {
      const expectedResult = ['123', '456'];
      expect(ColorPaletteState.colorPaletteIds(fakeColorPaletteSate)).toEqual(
        expectedResult
      );
    });
    it('Should return selected color palette when there is one selected', async () => {
      const expectedResult = {
        id: '123',
        title: 'test1',
        data: ['#123', '#456']
      };
      expect(
        ColorPaletteState.selectedColorPalette(fakeColorPaletteSate)
      ).toEqual(expectedResult);
    });
    it('Should return null when there is selected palette', async () => {
      const fakeColorPaletteStateWithoutSelectedPalette = {
        ...fakeColorPaletteSate,
        ...{ selected: null }
      };
      const expectedResult = null;
      expect(
        ColorPaletteState.selectedColorPalette(
          fakeColorPaletteStateWithoutSelectedPalette
        )
      ).toEqual(expectedResult);
    });

    it('Should return selected matrix', async () => {
      const expectedResult = { size: 15, fontWeight: FontWeight.FIVE_HUNDRED };
      expect(ColorPaletteState.selectedMatrix(fakeColorPaletteSate)).toEqual(
        expectedResult
      );
    });
  });

  describe('Actions', () => {
    describe('SetErrors', () => {
      // TODO
    });
    describe('LoadColorPalettes', () => {
      // TODO
    });
    describe('SaveColorPalette', () => {
      // TODO
    });
    describe('DeleteColorPalette', () => {
      // TODO
    });
    describe('SetSelectedColorPalette', () => {
      // TODO
    });
    describe('SetSelectedMatrix', () => {
      // TODO
    });
  });
});
