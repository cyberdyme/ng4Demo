/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {IsometricComponent, Rectangle, Shape} from './isometric.component';
import {forEach} from "@angular/router/src/utils/collection";

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
    const pointObservables=rect.getPoints();
    pointObservables.subscribe( p =>
    {
      for(const item of p)
      {
        console.log("x="+item.x+" y="+item.y+" z="+item.z);
      }
    });
  });
});

describe('Shape', () =>{
  it('should have number of points', () =>{
    const shapes=new Shape(0,0);
    shapes.addShape(new Rectangle(0,0,16,16));
    shapes.addShape(new Rectangle(0,0,32,32));

    const pointObservables=shapes.getPoints();
    pointObservables.subscribe( p =>
    {
      console.log("=========================");
      /*
      for(const shape of p)
      {
        for(const item of shape) {
          console.log("x=" + item.x + " y=" + item.y + " z=" + item.z);
        }
      }
      */
      for(const item of p) {
        console.log("x=" + item.x + " y=" + item.y + " z=" + item.z);
      }
    });
  });
});
