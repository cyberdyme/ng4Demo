import {Component, ViewChild, ElementRef} from '@angular/core';
import {MenuProviderService} from './app.route';
import {WindowingService} from "./services/windowing-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public menuService: MenuProviderService) {
  }
}
