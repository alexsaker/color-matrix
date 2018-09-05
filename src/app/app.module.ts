import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppState } from './shared/store/app.state';
import { RouterState } from './shared/store/router.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MatSnackBarModule } from '@angular/material';
import { environment } from '../environments/environment';

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  CoreModule,
  MatSnackBarModule,
  NgxsModule.forRoot([RouterState, AppState]),

  NgxsStoragePluginModule.forRoot({
    key: ['colorPalettes', 'app']
  })
];
if (!environment.production) {
  IMPORTS.push(NgxsReduxDevtoolsPluginModule.forRoot());
  IMPORTS.push(NgxsLoggerPluginModule.forRoot());
}

@NgModule({
  declarations: [AppComponent],
  imports: [...IMPORTS],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
