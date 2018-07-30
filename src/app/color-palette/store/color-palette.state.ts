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
  SetSelectedMatrix,
  SetSuitableMatrix
} from './color-palette.actions';
import { Store } from '@ngxs/store';

export const RANGE_START = 8;
export const RANGE_END = 50;

export interface ColorPaletteStateModel {
  ids: string[];
  entities: { [key: string]: ColorPalette };
  error: Error;
  selected: string;
  selectedMatrix: number;
  matrices: ColorPaletteMatrix[];
  sizeGroup: number[];
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
    selectedMatrix: 1,
    matrices: [
      {
        id: 1,
        size: 11,
        title: '11 > 23 px',
        fontWeight: FontWeight.NORMAL,
        checked: true
      },
      {
        id: 2,
        size: 19,
        title: '19 > 23 px',
        fontWeight: FontWeight.BOLD,
        checked: false
      },
      {
        id: 3,
        size: 24,
        title: '+24 px',
        fontWeight: FontWeight.ALL,
        checked: false
      }
    ],
    sizeGroup: [11, 19, 24],
    sizes: range(RANGE_START, RANGE_END),
    fontWeights: [FontWeight.LIGHT, FontWeight.NORMAL, FontWeight.BOLD]
  }
})
export class ColorPaletteState implements NgxsOnInit {
  @Selector()
  static colorPalettes(state: ColorPaletteStateModel) {
    return Object.keys(state.entities).map(key => state.entities[key]);
  }
  @Selector()
  static colorPaletteMatrices(state: ColorPaletteStateModel) {
    return state.matrices;
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
  static selectedMatrix(state: ColorPaletteStateModel) {
    return state.matrices
      .filter(matrix => matrix.id === state.selectedMatrix)
      .shift();
  }

  @Selector()
  static colorPaletteIds(state: ColorPaletteStateModel) {
    return state.ids;
  }
  @Selector()
  static selectedColorPalette(state: ColorPaletteStateModel): ColorPalette {
    return state.selected ? state.entities[state.selected] : null;
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
    const matrices = state.matrices.map(
      matrix =>
        action.id === matrix.id
          ? { ...matrix, checked: true }
          : { ...matrix, checked: false }
    );
    ctx.patchState({ selectedMatrix: action.id, matrices: matrices });
  }

  @Action(SetSuitableMatrix)
  setSuitableMatrix(
    ctx: StateContext<ColorPaletteStateModel>,
    action: SetSuitableMatrix
  ) {
    if (!!action.size && action.size < 19) {
      ctx.dispatch(new SetSelectedMatrix(1));
    } else if (!!action.size && action.size >= 19 && action.size < 23) {
      if (!!action.fontWeight) {
        if (
          action.fontWeight === FontWeight.NORMAL ||
          action.fontWeight === FontWeight.LIGHT
        ) {
          ctx.dispatch(new SetSelectedMatrix(1));
        } else if (action.fontWeight === FontWeight.BOLD) {
          ctx.dispatch(new SetSelectedMatrix(2));
        }
      } else {
        ctx.dispatch(new SetSelectedMatrix(1));
      }
    } else if (!!action.size && action.size > 23) {
      ctx.dispatch(new SetSelectedMatrix(3));
    } else {
      ctx.dispatch(new SetSelectedMatrix(1));
    }
  }
}
