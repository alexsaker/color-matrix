import { Action, State, StateContext } from '@ngxs/store';
import {
  CloseSidenav,
  DisplayMatrixToolbarForm,
  HideMatrixToolbarForm,
  ToggleSidenav,
  ShowSuccessSnackBar,
  ShowErrorSnackBar,
  OpenSidenav
} from './app.actions';
import { MatSnackBar } from '@angular/material';

export interface AppStateModel {
  version: number;
  isSidenavOpened: boolean;
  isMatrixToolbarFormVisible: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    version: 1,
    isSidenavOpened: getSidenavStateFromLocalStorage() || false,
    isMatrixToolbarFormVisible: true
  }
})
export class AppState {
  private static readonly SNACKBAR_BAR = 2000;
  constructor(public snackBar: MatSnackBar) {}
  @Action(ToggleSidenav)
  toggleSidenav(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isSidenavOpened: !state.isSidenavOpened
    });
  }
  @Action(CloseSidenav)
  closeSidenav(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isSidenavOpened: false
    });
  }
  @Action(OpenSidenav)
  openSidenav(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isSidenavOpened: true
    });
  }
  @Action(DisplayMatrixToolbarForm)
  displayMatrixToolbarForm(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isMatrixToolbarFormVisible: true
    });
  }
  @Action(HideMatrixToolbarForm)
  hideMatrixToolbarForm(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isMatrixToolbarFormVisible: false
    });
  }
  @Action(ShowSuccessSnackBar)
  showSuccessSnackBar(
    ctx: StateContext<AppStateModel>,
    action: ShowSuccessSnackBar
  ) {
    this.snackBar.open(action.message, null, {
      duration: AppState.SNACKBAR_BAR
    });
  }
  @Action(ShowErrorSnackBar)
  showErrorSnackBar(
    ctx: StateContext<AppStateModel>,
    action: ShowErrorSnackBar
  ) {
    this.snackBar.open(action.message, 'CLOSE', {
      duration: AppState.SNACKBAR_BAR
    });
  }
}

function getSidenavStateFromLocalStorage(): boolean | null {
  const appState = localStorage.getItem('app');
  if (!!appState) {
    try {
      const parsedAppState = JSON.parse(appState);
      return parsedAppState.isSidenavOpened || null;
    } catch (error) {
      localStorage.removeItem('app');
    }
  }
  return null;
}