import { Component } from '@angular/core'
import { OnInit } from '@angular/core'

import { Item } from './item.component'
import { ItemService } from './item.service'

// 定义组件的元信息
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService]
})

// 定义组件类
export class AppComponent implements OnInit {
  items: Item[]
  selectItem: Item

  onSelect(item: Item): void {
    this.selectItem = item
  }

  ngOnInit(): void {
    this.itemService.getItems().then(items => this.items = items)
  }

  constructor(private itemService: ItemService) {
  }
}
