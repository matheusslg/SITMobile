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
  showStops: boolean;

  constructor(
    public navCtrl: NavController,
    public mainProvider: MainProvider
  ) {
    this.paradas = [];
    this.showStops = false;
  }

  ionViewDidEnter() {
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

  openMap() {
    this.navCtrl.push('MapPage', {
      paradas: this.paradas
    });
  }

  getAllParadas() {
    this.mainProvider.getListParadas().subscribe(res => {
      this.paradasJson = res;
      let parada: any = {};
      this.paradasJson.forEach(_parada => {
        parada = new Parada();
        parada.id = _parada.id;
        parada.coordenadas = _parada.coordenadas;
        parada.idCidade = _parada.idCidade;
        parada.localizacao = _parada.localizacao;
        parada.nome = _parada.nome;
        parada.sendo_usada = _parada.sendo_usada;
        this.paradas.push(parada);
      });
    })
  }

}
