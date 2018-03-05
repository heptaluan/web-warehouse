import { Component, OnInit } from '@angular/core';
import { Http, Jsonp } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/Rx'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  constructor(private http: Http, private jsonp: Jsonp) { }

  public list: any = []

  getData() {
    let url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1'
    let _this = this
    this.http.get(url)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data)
        _this.list = data['result']
    })
  }

  jsonpData() {
    let url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSONP_CALLBACK'
    let _this = this
    this.jsonp.get(url)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data)
        _this.list = data['result']
    })
  }

  ngOnInit() {
  }

}
