export class ToggleSidenav {
  static readonly type = '[App] ToggleSidenav';
}
export class CloseSidenav {
  static readonly type = '[App] CloseSidenav';
}
export class OpenSidenav {
  static readonly type = '[App] OpenSidenav';
}
export class DisplayMatrixToolbarForm {
  static readonly type = '[App] DisplayMatrixToolbarForm';
}
export class HideMatrixToolbarForm {
  static readonly type = '[App] HideMatrixToolbarForm';
}
export class ShowSuccessSnackBar {
  static readonly type = '[App] ShowSuccessSnackBar';
  constructor(public message: string) {}
}
export class ShowErrorSnackBar {
  static readonly type = '[App] ShowErrorSnackBar';
  constructor(public message: string) {}
}
