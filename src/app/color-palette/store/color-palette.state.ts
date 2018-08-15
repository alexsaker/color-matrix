import { ColorMatrixSelection } from './../models/color-matrix.model';
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar
} from './../../shared/store/app.actions';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { range } from 'lodash';

import { FontWeight } from '../enums/font-weight.enum';
import { ColorPaletteMatrix } from '../models/color-palette-matrix.model';
import { ColorPalette } from '../models/color-palette.model';
import { ColorPaletteService } from '../services/color-palette.service';
import {
  DeleteColorPalette,
  LoadColorPalettes,
  SaveColorPalette,
  SetErrors,
  SetSelectedColorPalette,
  SetSelectedMatrix
} from './color-palette.actions';
import { Store } from '@ngxs/store';

export const RANGE_START = 12;
export const RANGE_END = 25;

export interface ColorPaletteStateModel {
  ids: string[];
  entities: { [key: string]: ColorPalette };
  error: Error;
  selected: string;
  selectedMatrix: ColorMatrixSelection;
  sizes: number[];
  fontWeights: string[];
}
@State<ColorPaletteStateModel>({
  name: 'colorPalettes',
  defaults: {
    ids: [],
    entities: {},
    error: null,
    selected: null,
    selectedMatrix: { size: 12, fontWeight: FontWeight.NORMAL },
    sizes: range(RANGE_START, RANGE_END),
    fontWeights: [
      FontWeight.LIGHTER,
      FontWeight.NORMAL,
      FontWeight.BOLD,
      FontWeight.BOLDER
    ]
  }
})
export class ColorPaletteState implements NgxsOnInit {
  @Selector()
  static colorPalettes(state: ColorPaletteStateModel) {
    return Object.keys(state.entities).map(key => state.entities[key]);
  }

  @Selector()
  static colorPaletteSizes(state: ColorPaletteStateModel) {
    return state.sizes;
  }
  @Selector()
  static colorPaletteFontWeights(state: ColorPaletteStateModel) {
    return state.fontWeights;
  }

  @Selector()
  static colorPaletteIds(state: ColorPaletteStateModel) {
    return state.ids;
  }
  @Selector()
  static selectedColorPalette(state: ColorPaletteStateModel): ColorPalette {
    return state.selected ? state.entities[state.selected] : null;
  }
  @Selector()
  static selectedMatrix(state: ColorPaletteStateModel) {
    return state.selectedMatrix;
  }
  constructor(
    private store: Store,
    private colorPaletteService: ColorPaletteService
  ) {}
  ngxsOnInit(ctx: StateContext<ColorPaletteStateModel>) {
    ctx.dispatch(new LoadColorPalettes());
    ctx.dispatch(new SetSelectedColorPalette());
  }
  @Action(SetErrors)
  setError(ctx: StateContext<ColorPaletteStateModel>, error: Error) {
    ctx.patchState({ error: error });
  }
  @Action(LoadColorPalettes)
  loadColorPalettes(ctx: StateContext<ColorPaletteStateModel>) {
    try {
      const state = ctx.getState();
      const colorPalettesFromLocalStorage = JSON.parse(
        localStorage.getItem('colorPalettes')
      );
      const colorPalettes: ColorPalette[] =
        !!colorPalettesFromLocalStorage &&
        colorPalettesFromLocalStorage.length > 0
          ? colorPalettesFromLocalStorage
          : [
              this.colorPaletteService.getDefaultColorPaletteAndSetLocalStorage()
            ];
      const { ids, entities } = colorPalettes.reduce(
        (acc, current) => {
          acc.ids.push(current.id);
          acc.entities[current.id] = current;
          return acc;
        },
        { ids: [], entities: {} }
      );
      ctx.setState({
        ...state,
        ids: ids,
        entities: entities
      });
    } catch (error) {
      localStorage.removeItem('colorPalettes');
      ctx.dispatch(new SetErrors([error]));
    }
  }

  @Action(SaveColorPalette)
  saveColorPalette(
    ctx: StateContext<ColorPaletteStateModel>,
    action: SaveColorPalette
  ) {
    const state = ctx.getState();
    const { colorPalette, error } = this.colorPaletteService.saveColorPalette(
      action.label,
      action.data
    );
    if (error) {
      this.store.dispatch(new ShowErrorSnackBar(error.message));
      ctx.patchState({ error: error });
    } else if (!!colorPalette) {
      const colorPaletteEntity = {};
      colorPaletteEntity[colorPalette.id] = colorPalette;
      ctx.patchState({
        ids: [...state.ids, colorPalette.id],
        entities: { ...state.entities, ...colorPaletteEntity }
      });
      this.store.dispatch(
        new ShowSuccessSnackBar('Color Palette has been created successfully.')
      );
    }
  }

  @Action(DeleteColorPalette)
  deleteColorPalette(
    ctx: StateContext<ColorPaletteStateModel>,
    action: DeleteColorPalette
  ) {
    const state = ctx.getState();
    const { error } = this.colorPaletteService.deleteColorPalette(action.id);
    if (error) {
      this.store.dispatch(new ShowErrorSnackBar(error.message));
      ctx.patchState({ error: error });
    } else {
      const stateIds = state.ids.filter(cpId => cpId !== action.id);
      const stateEntities = state.entities;
      delete stateEntities[action.id];
      ctx.patchState({
        ids: [...stateIds],
        entities: { ...stateEntities }
      });
      this.store.dispatch(
        new ShowSuccessSnackBar('Color Palette has been deleted successfully.')
      );
    }
  }

  @Action(SetSelectedColorPalette)
  setSelectedColorPalette(
    ctx: StateContext<ColorPaletteStateModel>,
    action: SetSelectedColorPalette
  ) {
    const state = ctx.getState();
    if (!!action.id) {
      ctx.patchState({ selected: action.id });
    } else {
      const firstId = state.ids[0];
      if (firstId) {
        ctx.patchState({ selected: firstId });
      }
    }
  }

  @Action(SetSelectedMatrix)
  setSelectedMatrix(
    ctx: StateContext<ColorPaletteStateModel>,
    action: SetSelectedMatrix
  ) {
    const state = ctx.getState();
    ctx.patchState({
      selectedMatrix: { size: action.size, fontWeight: action.fontWeight }
    });
  }
}
