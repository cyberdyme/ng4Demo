import {Directive, HostListener} from '@angular/core';
import {Input} from '@angular/core/src/metadata/directives';

@Directive({
  selector: '[track]'
})
export class TrackDirective {
  @Input() track;
  @HostListener('click', ['$event.target']) onClick(btn) {
    console.log(this.track + btn);
  }
}
