import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {

  constructor(
    public _http: Http,
  ) { }

  public request(_url) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // let options = new RequestOptions({ headers: headers });
    return this._http.get(_url).map(res => res.json())
  }

  public post(_url, _data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(_url, JSON.stringify(_data), options).map(res => res.json())
  }

  public getListParadas() {
    let url = 'http://kraft.ads.cnecsan.edu.br/~matheuscavallini/busroute/adm/api/paradas.php';
    return this.request(url);
  }

  public getResultado(_data) {
    let url = 'http://kraft.ads.cnecsan.edu.br/~matheuscavallini/SITMobile/v2/actions/resultado.php';
    return this.post(url, _data);
  }

}
