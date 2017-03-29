import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  private last: MouseEvent;
  private el: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }


  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const context = canvas.getContext('2d');

    // Create gradient
    const grd = context.createLinearGradient(96.267, 0.000, 815.733, 758.000);

    // Add colors
    grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
    grd.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');

    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(450, 50);
    context.lineWidth = 10;

    // set line color
    context.strokeStyle = '#ff0000';
    context.stroke();

    const width=context.canvas.width;
    const height=context.canvas.height;
    console.log('Canvas::Canvas width=' + width);
    console.log('Canvas::Canvas height=' + height);
  }
}
