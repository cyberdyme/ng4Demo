import {Directive, HostListener, OnInit, EventEmitter, Renderer, ElementRef} from '@angular/core';
import {combineLatest} from "rxjs/observable/combineLatest";
import {HostBinding} from "@angular/core/src/metadata/directives";


interface IMousePosition
{
  x : number;
  y : number;
}

@Directive({
  selector: '[cs-paint]'
})
export class PaintDirective implements OnInit {
  private _currentSate : boolean;
  private _mouseMoveStream: EventEmitter<IMousePosition> = new EventEmitter();
  private _mouseIsPressedStream: EventEmitter<boolean> = new EventEmitter();

  constructor(private el: ElementRef,
              private renderer: Renderer) {
    this._currentSate = false;
  }

  @HostBinding('style.cursor') cursor = "Default";

  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    console.log('mouseup' + this._currentSate );
    this._currentSate = !this._currentSate;
    this._mouseIsPressedStream.emit(this._currentSate);
  }


  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
    this._mouseMoveStream.emit(this.getMousePos(this.el.nativeElement, event));
  }

  //noinspection JSUnusedGlobalSymbols
  ngOnInit() {
    this._mouseIsPressedStream.subscribe( (x:boolean) => {
      if(x) {
        this.cursor="CrossHair"
      }
      else {
        this.cursor="Default"
      }
    });

    combineLatest(this._mouseMoveStream, this._mouseIsPressedStream, (pos : IMousePosition, isPressed : boolean) => {
      return {x : pos.x,y : pos.y , pressed : isPressed}
    }).subscribe( (x : { x: number, y: number, pressed:boolean }) =>
    {
      // console.log("p="+x.pressed+" x="+x.x + " y="+x.y);
      if(x.pressed) {
        var canvas = this.el.nativeElement as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "Red"
        ctx.fillRect(x.x, x.y, 1, 1);
      }
    });
  }

  getMousePos(el : HTMLCanvasElement , evt) : IMousePosition {
    var rect = el.getBoundingClientRect(), // abs. size of element
      scaleX = el.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = el.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }
}
