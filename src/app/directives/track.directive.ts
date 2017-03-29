import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[track]'
})
export class TrackDirective {
  @Input() track;
  @HostListener('click', ['$event.target']) onClick(btn) {
    console.log(this.track + btn);
  }
}
