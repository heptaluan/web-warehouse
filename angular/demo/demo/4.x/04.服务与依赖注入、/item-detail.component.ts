import { Component, Input } from '@angular/core'

import { Item } from './item.component'

@Component({
  selector: 'item-detail',
  template: `
    <div *ngIf="selectItem" class="list-content">
      <div>id: {{selectItem.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectItem.name" />
      </div>
    </div>
  `
})

// 使用 @Input 来定义 selectItem，使其成为一个输入属性
export class ItemDetailComponent {
  @Input() selectItem: Item
}
