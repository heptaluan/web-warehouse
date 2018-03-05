// 引入 Angular 中的 Component 组件
import { Component } from '@angular/core';

@Component({
  // 使用组件的名称
  selector: 'app-root',
  // 组件对应的 html
  templateUrl: './app.component.html',
  // 组件对应的 css
  styleUrls: ['./app.component.css']
})

// 数据
export class AppComponent {
  title = 'app';
}
