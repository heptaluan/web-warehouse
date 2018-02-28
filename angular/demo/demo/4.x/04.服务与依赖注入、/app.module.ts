import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ItemDetailComponent } from './item-detail.component'

@NgModule({
  declarations: [ AppComponent, ItemDetailComponent ],
  imports: [ BrowserModule, FormsModule ],
  bootstrap: [ AppComponent ],
  providers: []
})

export class AppModule { }