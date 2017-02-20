import {Directive, HostListener, ElementRef, AfterViewInit} from '@angular/core';
import {WindowingService} from "../services/windowing-service";

@Directive({
  selector: '[cs-resize-tracking]'
})
export class ResizeTrackingDirective implements AfterViewInit {
  constructor(private el: ElementRef, private  windowingService: WindowingService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(this.el.nativeElement as HTMLElement)
  }

  ngAfterViewInit(): void {
    this.resize(this.el.nativeElement as HTMLElement)
  }

  private resize(element : HTMLElement)
  {
    const width=element.clientWidth;
    const height=element.clientHeight;
    this.windowingService.Resize({width : width, height: height});
  }
}
