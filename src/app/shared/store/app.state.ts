import { Action, State, StateContext } from '@ngxs/store';
import {
  DisplayMatrixToolbarForm,
  HideMatrixToolbarForm,
  ShowSuccessSnackBar,
  ShowErrorSnackBar,
} from './app.actions';
import { MatSnackBar } from '@angular/material';

export interface AppStateModel {
  version: number;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    version: 1,
  }
})
export class AppState {
  private static readonly SNACKBAR_BAR = 2000;
  constructor(public snackBar: MatSnackBar) {}
 
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
