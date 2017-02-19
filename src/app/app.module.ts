import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterialModule} from '@angular/material';
import {APP_PROVIDERS} from './app.provider';
import { HelloWorldComponent } from './components/hello-world.component';
import {routing} from './app.route';
import { AboutComponent } from './components/about.component';
import {CanvasModule} from './components/canvas/canvas.module';
import { TrackDirective } from './directives/track.directive';
import { IsomerComponent } from './components/isomer/isomer.component';
import {IsomerModule} from "./components/isomer/isomer.module";

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    AboutComponent,
    TrackDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    CanvasModule,
    IsomerModule
  ],
  exports: [
    HelloWorldComponent
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
