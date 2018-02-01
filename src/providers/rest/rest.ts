import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getData(data) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8080/aris/diamondSelectlist',JSON.stringify(data)).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/aris/login', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCalendarColor(data) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/aris/activities/getActivities', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
