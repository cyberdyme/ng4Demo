import { Component } from '@angular/core';
import {MenuProviderService} from './app.route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(public menuService: MenuProviderService) {
  }
}
