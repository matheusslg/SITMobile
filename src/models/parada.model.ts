export class Parada {
    id: any;
    nome: string;
    localizacao: string;
    coordenadas: string;
    idCidade: any;
    sendo_usada: boolean;

    constructor() { }

    private getMapa() {
        return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.coordenadas + '&key=AIzaSyCxqgKqZMHNzOV2TETOwjRJAUpuh3aeK1c'
    }
}