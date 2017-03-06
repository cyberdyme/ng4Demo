/**
 * Created by girishthanki on 06/03/2017.
 */
import {NgModule, ModuleWithProviders} from '@angular/core';
import {RandomizeService} from './randomize.service';


@NgModule({
})
export class RandomizeServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RandomizeServiceModule,
      providers: [RandomizeService]
    };
  }
}
