import { Injectable } from '@angular/core'

import { Item } from './item.component'
import { ITEMS } from './mock-items'

@Injectable()
export class ItemService {
  getItems(): Promise < Item[] > {
    return Promise.resolve(ITEMS)
  }
}