export class Parada {
    id: any;
    nome: string;
    localizacao: string;
    coordenadas: string;
    idCidade: any;
    sendo_usada: boolean;

    constructor(id: any, nome: string, localizacao: string, coordenadas: string, idCidade: any, sendo_usada: boolean) {
        this.id = id;
        this.nome = nome;
        this.localizacao = localizacao;
        this.coordenadas = coordenadas;
        this.idCidade = idCidade;
        this.sendo_usada = sendo_usada;
        //this.mapa = this.getMapa();
    }

    private getMapa() {
        return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.coordenadas + '&key=AIzaSyCxqgKqZMHNzOV2TETOwjRJAUpuh3aeK1c'
    }
}