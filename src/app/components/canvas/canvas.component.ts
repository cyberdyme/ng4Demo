import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {HostListener} from "@angular/core/src/metadata/directives";
import {ViewChild} from "@angular/core/src/metadata/di";

interface IMousePosition
{
  x : number;
  y : number;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  private last: MouseEvent;
  private el: HTMLElement;

  private mouseDown: boolean = false;

  @HostListener('mouseup')
  onMouseup() {
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
    //if (this.mouseDown) {
    /*
     this.canvas.rotate(
     event.clientX - this.last.clientX,
     event.clientY - this.last.clientY,
     }
     */


    let canvas = this.canvas.nativeElement as HTMLCanvasElement;
    let mousePos = this.getMousePos(canvas, event);
    /*
    var rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log('x =>' + x + ' y=>' + y);
    */

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "Red"
    ctx.fillRect(mousePos.x, mousePos.y, 1, 1);
    //  this.last = event;
    //}
  }

  @HostListener('mousedown', ['$event']) onMousedown(event) {
    this.mouseDown = true;
    this.last = event;
  }

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }

  getMousePos(canvas, evt) : IMousePosition {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

  ngAfterViewInit(): void {
    let canvas = this.canvas.nativeElement as HTMLCanvasElement;

    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    var context = canvas.getContext('2d');

    // Create gradient
    let grd = context.createLinearGradient(96.267, 0.000, 815.733, 758.000);

    // Add colors
    grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
    grd.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');

    // Fill with gradient
    //context.fillStyle = grd;
    //context.fillRect(0, 0, 912.000, 758.000);

    // ...then set the internal size to match
    //canvas.width  = canvas.offsetWidth;
    //canvas.height = canvas.offsetHeight;

    //context.fillStyle = "Red";
    //context.fillRect(0,0,320,200);

    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(450, 50);
    context.lineWidth = 10;

    // set line color
    context.strokeStyle = '#ff0000';
    context.stroke();
  }
}
