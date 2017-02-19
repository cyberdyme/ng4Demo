/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HelloWorldComponent} from './components/hello-world.component';
import {AboutComponent} from './components/about.component';
import {TrackDirective} from './directives/track.directive';
import {routing} from './app.route';
import {CanvasModule} from './components/canvas/canvas.module';
import {MaterialModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HelloWorldComponent,
        AboutComponent,
        TrackDirective
      ],
      imports: [
        MaterialModule.forRoot(),
        routing,
        CanvasModule
      ],
    });
    TestBed.compileComponents();
  });

  /*
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
  */
});
