import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[setBackground]'
})

export class AppDirective {

  private _defaultColor = 'red'

  @Input('setBackground')
  backgroundColor: string;

  constructor(
    private el: ElementRef,
    private re: Renderer2
  ) {
    this.setStyle(this.backgroundColor || this._defaultColor)
  }

  setStyle(color: string) {
    this.re.setStyle(this.el.nativeElement, 'backgroundColor', color)
  }

  @HostListener('click', ['$event'])
  onclick() {
    this.setStyle(this.backgroundColor)
  }

}
