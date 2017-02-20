import {NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WindowingService} from "./windowing-service";


@NgModule({
  imports: [
    CommonModule
  ]
})
export class WindowingServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WindowingServiceModule,
      providers: [WindowingService]
    }
  }
}
