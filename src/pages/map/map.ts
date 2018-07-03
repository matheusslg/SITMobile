import { MainProvider } from './../../providers/main/main';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as _ from 'underscore';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  paradas: any;
  map: any;
  bounds: any;
  markers: any;
  circles: any;
  possibleStops: any;
  stopDestination: any;
  radius: any;
  radiusDefaultValue: any;
  radiusLimit: any;
  userMarker: any;
  possibleStopsVerified: any;
  resultApi: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public mainProvider: MainProvider,
    private zone: NgZone,
    public toastCtrl: ToastController
  ) {
    this.paradas = navParams.get('paradas');
    this.markers = [];
    this.circles = [];
    this.possibleStops = [];
    this.possibleStopsVerified = [];
    this.radiusDefaultValue = 400;
    // this.radiusLimit = 250;
    this.radius = this.radiusDefaultValue;
    this.stopDestination = '';
  }

  presentToast(_message, _duration) {
    const toast = this.toastCtrl.create({
      message: _message,
      duration: _duration
    });
    toast.present();
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        var position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        // var positionFake = { lat: -28.300339, lng: -54.267294 };
        // var position = positionFake;

        const mapOptions = {
          zoom: 18,
          center: position
        }

        this.bounds = new google.maps.LatLngBounds();
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        let userWindow = new google.maps.InfoWindow(), userMarker;

        let userIcon = "assets/imgs/user-icon.png";
        let paradaIcon = "assets/imgs/bus-icon.png";

        userMarker = new google.maps.Marker({
          position: position,
          icon: userIcon,
          map: this.map,
          title: "Você está aqui",
          animation: google.maps.Animation.DROP
        });
        this.userMarker = userMarker;

        this.bounds.extend(position);

        let userWindowContent = '';
        userWindowContent += '<div class="info-window">';

        userWindowContent += '<h4><strong>Esta é sua localização!</strong></h4>';
        userWindowContent += '<p>Selecione a parada de destino que você deseja,<br />para isto, basta clicar em um ícone de parada <br />no mapa conforme a legenda abaixo!</p>';
        userWindowContent += '<h6><strong>Legenda:</strong></h6>';

        userWindowContent += '<div class="info-window info-window-legend">';
        userWindowContent += '<div class="info-window info-window-image">';
        userWindowContent += '<img src="' + userIcon + '" height="25" />';
        userWindowContent += '</div>';
        userWindowContent += '<div class="info-window info-window-item">';
        userWindowContent += '<span class="info-window info-window-text">Sua localização</span>';
        userWindowContent += '</div>';
        userWindowContent += '</div><br />';

        userWindowContent += '<div class="info-window info-window-legend">';
        userWindowContent += '<div class="info-window info-window-image">';
        userWindowContent += '<img src="' + paradaIcon + '" height="25" />';
        userWindowContent += '</div>';
        userWindowContent += '<div class="info-window info-window-item">';
        userWindowContent += '<span class="info-window info-window-text">Parada</span>';
        userWindowContent += '</div>';
        userWindowContent += '</div>';

        userWindowContent += '</div>';

        //userWindowContent += '<img class="info-window info-window-image" src="' + paradaIcon + '" height="25" /><span class="info-window info-window-text">Parada</span>';

        this.paradas.forEach(parada => {
          let coordenadasParada = parada.coordenadas.split(',');
          let position = { lat: Number(coordenadasParada[0]), lng: Number(coordenadasParada[1]) }

          let infoWindow = new google.maps.InfoWindow(), marker, i;

          marker = new google.maps.Marker({
            position: position,
            icon: paradaIcon,
            map: this.map,
            title: parada.nome,
            paradaId: parada.id
          })

          let infoWindowContent = '';
          infoWindowContent += '<div class="info-window">';
          infoWindowContent += '<h4>Você selecionou a parada:</h4>';
          infoWindowContent += '<p><strong>Nome: </strong>' + parada.nome + '</p>';
          infoWindowContent += '<p><strong>Localização: </strong>' + parada.localizacao + '</p>';
          infoWindowContent += '</div>';

          // google.maps.event.addListener(marker, 'dblclick', ((marker, i) => {
          //   return function () {
          //     infoWindow.setContent(infoWindowContent);
          //     infoWindow.open(this.map, marker);
          //   }
          // })(marker, i));

          google.maps.event.addListener(marker, 'click', ((marker, i) => {
            return () => {

              infoWindow.setContent(infoWindowContent);
              infoWindow.open(this.map, marker);
              this.zone.run(() => {
                this.stopDestination = marker.paradaId;
              });

              ///////////////////////////////////////////////////////
              // Function to get de nearest marker from user position
              ///////////////////////////////////////////////////////
              // var lat = userMarker.getPosition().lat();
              // var lng = userMarker.getPosition().lng();
              // var R = 6371; // radius of earth in km
              // var distances = [];
              // var closest = -1;
              // for (i = 0; i < markers.length; i++) {
              //   var mlat = markers[i].position.lat();
              //   var mlng = markers[i].position.lng();
              //   var dLat = (mlat - lat) * Math.PI / 180;
              //   var dLong = (mlng - lng) * Math.PI / 180;;
              //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              //     Math.cos(lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
              //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              //   var d = R * c;
              //   distances[i] = d;
              //   if (closest == -1 || d < distances[closest]) {
              //     closest = i;
              //   }
              // }
              // alert(markers[closest].title);
            }
          })(marker, i));

          this.markers.push(marker);

        });

        if (this.navParams.get('destino')) {
          this.stopDestination = this.navParams.get('destino');
          this.presentToast('Destino escolhido!', 5000);
          this.filterAction();
        } else {
          userWindow.setContent(userWindowContent);
          userWindow.open(this.map, userMarker);
          setTimeout(() => {
            userWindow.close();
          }, 15000);
        }

      }).catch((error) => {
        this.presentToast('Erro! ' + error.message, 10000);
      });
  }

  filterAction() {
    if (this.circles.length > 0) {
      this.circles.forEach(circle => {
        circle.setMap(null);
      });
      this.circles = [];
      this.radius = this.radiusDefaultValue;
    }

    if (this.possibleStops.length > 0) {
      this.possibleStops = [];
    }

    // while (!this.searchForNearestStops() && this.radius <= this.radiusLimit) {
    this.searchForNearestStops();
    //   this.radius += 25;
    // }

  }

  searchForNearestStops() {
    let circle = new google.maps.Circle({
      map: this.map,
      radius: this.radius,
      fillColor: '#00c0ff',
      fillOpacity: 0.1,
      strokeColor: '#008aff',
      strokeOpacity: 0.3,
      strokeWeight: 0.5
    });

    circle.bindTo('center', this.userMarker, 'position');
    this.circles.push(circle);

    this.markers.forEach(_marker => {
      if (google.maps.geometry.spherical.computeDistanceBetween(_marker.getPosition(), circle.getCenter()) <= circle.getRadius()) {
        if (_marker.paradaId !== this.stopDestination) {
          // let aux = this.possibleStops;
          this.possibleStops.push(_marker.paradaId);
          //if (this.possibleStops.length > 0) {
          // console.log('entrou aqui', this.possibleStops);
          // this.possibleStopsVerified = this.possibleStops.filter(val => !aux.includes(val));
          //this.possibleStopsVerified = _.uniq(this.possibleStops);
          // console.log('final', this.possibleStopsVerified);
          //}
        }
      }
    });

    if (this.possibleStops.length === 0) {
      this.presentToast('Não há nenhuma parada próxima de você.', 10000);
      return false;
    } else {
      var postData = {
        "idsI": this.possibleStops,
        "idF": this.stopDestination
      };
      console.log('postData', postData);
      this.mainProvider.getResultado(postData).subscribe(res => {
        this.resultApi = res;
        if (res.status == true) {
          console.log(res);
          this.map.fitBounds(this.bounds);
          this.map.setZoom(16);

          var resultCoordinates = [];
          this.resultApi.cronograma.forEach(coordenadas => {
            let cord = coordenadas.split(',');
            resultCoordinates.push({ lat: Number(cord[0]), lng: Number(cord[1]) });
          });

          var result = new google.maps.Polyline({
            path: resultCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          result.setMap(this.map);

          this.presentToast('Oba! Achamos um ônibus compatível para você.', 5000);
          return true;
        } else {
          this.presentToast('Oops! Nenhum resultado encontrado.', 5000);
          console.log(res);
          return false;
        }
      })
    }
  }
}
