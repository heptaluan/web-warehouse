import { Component, OnInit } from '@angular/core';
import { Http, Jsonp, Headers } from '@angular/http'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  constructor(private http: Http, private jsonp: Jsonp) { }

  private headers = new Headers({'Content-Type': 'application/json'})

  public list: any = []

  getData() {
    let url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1'
    let _this = this
    this.http.get(url).subscribe((data) => {
      _this.list = JSON.parse(data['_body'])['result']
      console.log(_this.list)
    })
  }

  jsonpData() {
    let url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSONP_CALLBACK'
    let _this = this
    this.jsonp.get(url).subscribe((data) => {
      _this.list = data['_body']['result']
      console.log(_this.list)
    })
  }

  postData() {
    let url = 'http://localhost:8080/login'
    let data = {
      "username": "zhangsan",
      "password": "123"
    }
    this.http.post(
      url,
      data,
      {headers: this.headers}
    ).subscribe((data) => {
      console.log(data)
    })
  }

  ngOnInit() {
  }

}
