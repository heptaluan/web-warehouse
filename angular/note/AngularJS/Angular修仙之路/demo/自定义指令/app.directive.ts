import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSetBackground]'
})

export class SetBackgroundDirective {

  private _defaultColor = 'red';
  @Input('appSetBackground') appSetBackground: string;

  constructor(
    private el: ElementRef,
    private re: Renderer2
  ) {
    this.setStyle(this._defaultColor);
  }

  @HostListener('click')
  onClick() {
    this.setStyle(this.appSetBackground || this._defaultColor);
  }

  setStyle(color: string) {
    this.re.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

}
