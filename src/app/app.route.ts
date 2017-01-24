import {RouterModule, Route} from "@angular/router";
import {ModuleWithProviders, Injectable} from "@angular/core";
import {HelloWorldComponent} from "./components/hello-world.component";
import {AboutComponent} from "./components/about.component";

export interface ExtendedRoute extends Route {
  description?: string,
  icon?: string,
  order?: number
}

export declare type ExtendedRoutes = ExtendedRoute[];

// Route Configuration
export const routes: ExtendedRoutes = [
  {path: 'Canvas', loadChildren: './components/canvas/canvas.module#CanvasModule', description: 'Canvas', icon: 'create', order: 1},
  {path: 'About', component: AboutComponent, description: 'About', icon: 'portrait', order: 2},
  {path: '', component: HelloWorldComponent, description: 'HelloWord', icon: 'create', order: -1}
];


@Injectable()
export class MenuProviderService {
  GetMenuItems(): ExtendedRoutes {
    return this.SortByKey(routes, 'order').filter((k: ExtendedRoute) => k.order != -1);
  }

  SortByKey(array, key) {
    return array.sort((a, b) => {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
