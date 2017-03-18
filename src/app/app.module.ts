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
import {WindowingServiceModule} from './services/windowing-service.module';
import {IsoMetricModule} from "./components/isometric/isometric.module";
import {RandomizeServiceModule} from "./services/randomize.service.module";

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
    IsoMetricModule,
    WindowingServiceModule.forRoot(),
    RandomizeServiceModule.forRoot()
  ],
  exports: [
    HelloWorldComponent
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
