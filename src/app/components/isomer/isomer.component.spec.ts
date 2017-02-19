/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IsomerComponent } from './isomer.component';

describe('IsomerComponent', () => {
  let component: IsomerComponent;
  let fixture: ComponentFixture<IsomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
