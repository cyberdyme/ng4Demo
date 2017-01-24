import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasComponent} from "./canvas.component";
import {routing} from "./canvas.route";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  exports:[
    CanvasComponent
  ],
  declarations: [CanvasComponent]
})
export class CanvasModule { }
