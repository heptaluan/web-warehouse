import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
// 因为需要声明，所以引入 Item 子组件
// 因为每个组件都必须在一个 Angular 模块而且只能在一个 Angular 模块中进行声明
import { ItemDetailComponent } from './item-detail.component'

@NgModule({
  declarations: [ AppComponent, ItemDetailComponent ],
  imports: [ BrowserModule, FormsModule ],
  bootstrap: [ AppComponent ],
  providers: []
})

export class AppModule { }