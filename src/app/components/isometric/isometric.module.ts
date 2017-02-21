import {NgModule} from "@angular/core";
import {WindowingServiceModule} from "../../services/windowing-service.module";
import {CommonModule} from "@angular/common";
import { IsometricComponent } from './isometric.component';
import {ResizeTrackingDirective} from "../../directives/resize-tracking.directive";

@NgModule({
  imports: [
    CommonModule,
    WindowingServiceModule.forRoot()
  ],
  declarations: [IsometricComponent, ResizeTrackingDirective],
  exports: [IsometricComponent]
})
export class IsoMetricModule
{

}
