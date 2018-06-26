import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GroupPosts, Post } from '../domain/post.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit, OnDestroy {

  // 传递过来的 data 是 Observable
  @Input() data: Observable<Post[]>;
  groupPosts: GroupPosts[];
  dataSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.dataSubscription = this.data.subscribe(v => {
      this.groupPosts = this.groupByCategory(v);
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  groupByCategory(data: Post[]): GroupPosts[] {
    if (!data) {
      return;
    }
    // 利用 Set 去重
    const categories = new Set(data.map(x => x.category));
    // 生成新的数组
    const result = Array.from(categories).map(x => ({
      category: x,
      posts: data.filter(post => post.category === x)
    }));
    return result;
  }

}
