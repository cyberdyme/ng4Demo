import {NgModule, ModuleWithProviders} from '@angular/core';
import {WindowingService} from './windowing-service';


@NgModule({
})
export class WindowingServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WindowingServiceModule,
      providers: [WindowingService]
    };
  }
}
