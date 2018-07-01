import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {

  private API_URL = 'http://kraft.ads.cnecsan.edu.br/~matheuscavallini/busroute/adm/api/'

  constructor(
    public http: Http
  ) { }

  public getListParadas() {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'paradas.php';
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

}
