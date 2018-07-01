import { MainProvider } from './../../providers/main/main';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Parada } from '../../models/parada.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // paradas array from api
  paradasJson: any;
  paradas: Array<Parada>

  searchQuery: string = '';
  items: Parada[];

  constructor(
    public navCtrl: NavController,
    public mainProvider: MainProvider
  ) { }

  ionViewDidEnter() {
    this.paradas = [];
    this.getAllParadas();
    this.initializeItemsFilter();
  }

  initializeItemsFilter() {
    this.items = this.paradas;
  }

  filterItems(ev: any) {
    this.initializeItemsFilter();
    console.log(ev);
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  openMap(_paradaId: any) {
    this.navCtrl.push('MapPage', {
      paradaId: _paradaId
    });
  }

  getAllParadas() {
    this.mainProvider.getListParadas().then(res => {
      this.paradasJson = res;
      this.paradasJson.forEach(parada => {
        this.paradas.push(new Parada(parada.id, parada.nome, parada.localizacao, parada.coordenadas, parada.idCidade, parada.sendo_usada));
      });
    })
  }

}
