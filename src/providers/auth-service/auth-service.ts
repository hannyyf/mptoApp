import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://localhost/mpto/api/';
// let apiUrl = 'http://www.order-is.xyz/php/api/index.php/';

@Injectable()
export class AuthServiceProvider {

  constructor(
    public http : Http, 
    public httpclient: HttpClient,) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers}).subscribe(res => {
          resolve(res.json());
          console.log("cek response from server", res)
        }, (err) => {
          reject(err);
        });
    });

  }

}