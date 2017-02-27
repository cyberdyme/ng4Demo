/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {IsometricComponent, Rectangle, Shape, IPoint} from './isometric.component';
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs";

/*
describe('IsometricComponent', () => {
  let component: IsometricComponent;
  let fixture: ComponentFixture<IsometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsometricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

describe('Rectangle', () =>{
  it('should have number of points', () =>{
    const rect=new Rectangle(0,0,16,16);
    rect.generate();
    rect.display();

    rect.getPoints().subscribe((points: IPoint[]) =>{


      console.log(`(${points[0].x},${points[0].y})++++++++++(${points[1].x},${points[1].y})`);
      console.log(`|                     |`)
      console.log(`(${points[3].x},${points[3].y})++++++++++(${points[2].x},${points[2].y})`);

      for (let value of points) {
          console.log(`(${value.x},${value.y})`);
        }
      }
    );
  });
});

describe('Shape', () =>{
  it('should have number of points', () =>{
    const shapes=new Shape(0,0);
    const pointObservables: Observable<IPoint[]> = shapes.getPoints();
    pointObservables.subscribe( (points : IPoint[]) =>
    {
      for(let item of points) {
        console.log("jez x=" + item.x + " y=" + item.y + " z=" + item.z);
      }
    });

    shapes.addShape(new Rectangle(0,0,16,16));
    shapes.addShape(new Rectangle(0,0,24,24));
    shapes.addShape(new Rectangle(0,0,32,32));
    shapes.generate();
  });
});
