import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { Post } from './domain/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  posts: Observable<Post[]>;
  ngOnInit(): void {
    this.posts = this.getPosts();
  }

  getPosts(): Observable<Post[]> {
    return Observable.create((observer: Observer<Post[]>) => {
      setTimeout(() => {
        const posts = [
          { 'title': 'Functional Programming', 'category': 'RxJS' },
          { 'title': 'Angular 2 Component Inheritance', 'category': 'NG2' },
          { 'title': 'RxJS Operators', 'category': 'RxJS' },
          { 'title': 'Angular 2 Http Module - HTTP', 'category': 'WEB' },
          { 'title': 'RxJS Observable', 'category': 'RxJS' },
          { 'title': 'Angular 2 AsyncPipe', 'category': 'NG2' }
        ];
        observer.next(posts);
      }, 2000);
    });
  }
}
