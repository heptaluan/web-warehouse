import { Directive, Input, Output, EventEmitter, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Directive({
  selector: '[appMessage]'
})
export class MessageDirective implements OnInit, OnDestroy {

  _debounceTime: number;

  @Input() set appMessage(val: number) {
    this._debounceTime = val;
  }
  @Output() debounceClicks = new EventEmitter();
  private clicks = new Subject<any>();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.clicks
      .debounceTime(this._debounceTime)
      .subscribe(e => this.debounceClicks.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.clicks.next(event);
  }

}
