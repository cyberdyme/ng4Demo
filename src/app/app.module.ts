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
import {IsomerModule} from './components/isomer/isomer.module';
import {WindowingServiceModule} from './services/windowing-service.module';
import {IsoMetricModule} from "./components/isometric/isometric.module";

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
    MaterialModule,
    routing,
    CanvasModule,
    IsomerModule,
    IsoMetricModule,
    WindowingServiceModule.forRoot()
  ],
  exports: [
    HelloWorldComponent
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
