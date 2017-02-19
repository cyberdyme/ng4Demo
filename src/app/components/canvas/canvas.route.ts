/**
 * Created by girishthanki on 18/01/2017.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas.component';

const routes: Routes = [
  { path: 'Canvas', component: CanvasComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
