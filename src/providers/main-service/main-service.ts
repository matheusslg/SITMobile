import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/*
  Generated class for the MainServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainServiceProvider {

  data: any;

  constructor(
    public http: HttpClient,
    public _http: Http,
  ) {
    console.log('Hello MainServiceProvider Provider');
  }

  public request(_url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this._http.get(_url, options).map(res => res.json())
  }

  public getListParadas() {
    let url = environment.baseUri.ads + 'paradas.php';
    return this.request(url);
  }

  // public getListaParadas() {
  //   console.log('chegou aqui')
  //     if (this.data) {
  //       return Promise.resolve(this.data);
  //       console.log('Paradas', this.data);
  //     }
  //     return new Promise(resolve => {
  //       this.http.get(environment.baseUri.ads + 'paradas.php')
  //         .map(res => res.json())
  //         .subscribe(data => {
  //           this.data = data;
  //           resolve(this.data);
  //         });
  //     });
  // }

}
