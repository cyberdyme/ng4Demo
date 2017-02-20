import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsomerComponent} from './isomer.component';
import {WindowingServiceModule} from "../../services/windowing-service.module";

@NgModule({
  imports: [
    CommonModule,
    WindowingServiceModule.forRoot()
  ],
  exports: [
    IsomerComponent
  ],
  declarations: [
    IsomerComponent
  ]
})
export class IsomerModule { }
