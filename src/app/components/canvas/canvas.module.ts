import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasComponent} from "./canvas.component";
import {routing} from "./canvas.route";
import { PaintDirective } from './paint.directive';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  exports:[
    CanvasComponent
  ],
  declarations: [CanvasComponent, PaintDirective]
})
export class CanvasModule { }
