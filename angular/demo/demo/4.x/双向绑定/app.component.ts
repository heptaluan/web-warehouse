import { Component } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// 定义组件的元信息
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})

// 定义组件类
export class AppComponent {
  hero: Hero = {
    name: 'zhangsan'
  }
}

export class Hero {
  name: String
}