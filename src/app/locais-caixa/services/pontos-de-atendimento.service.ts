import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Lugar } from '../share/lugar';

@Injectable()
export class PontosDeAtendimentoService {

  private  url: string = 'http://localhost:9200/locais_v2/locais/_search';
  private urlBaseAssets: string = '/assets/';

  constructor(private http: Http) { }

  public getLocais(latitude: number, longitude: number,
  tipo : string[], servico: string) :  Observable<Lugar[]>{

      if (tipo.length > 0){
 
 let tipoEmTexto: string;

      for (let i = 0; i < tipo.length; i++){

        tipoEmTexto = tipoEmTexto + " " + tipo[i];

      }
       return this.http.post(this.url, {
    "sort" : [
        {
            "_geo_distance" : {
                "location" : latitude + "," + longitude,
                "order" : "asc",
                "unit" : "km"
            }
        }
    ],
    "from" : 0, "size" : 120,
    "query" : {
        "match" : { "tipo" : tipoEmTexto }
    }
})
        .map(res => {
          let json = res.json();             
          return json.hits.hits.map( val => val._source);
        })
      }

       else {
      return Observable.of([]);
    }
    
  }

  public urlLink(tipo: string): string {

    let tipoURL: string;
    switch (tipo) {
      case 'Agência':
        tipoURL = 'agencia.png';
        break;
      case 'Banco24Horas':
        tipoURL = '24horas.png';
        break;
      case 'Caixa Eletrônico':
        tipoURL = 'atm.png';
        break;
      case 'Correspondente CAIXA Aqui':
        tipoURL = 'aqui.png';
        break;
      case 'Lotérica':
        tipoURL = 'loterica.png';
        break;
      default:
        tipoURL = 'padrao.png'
    }

    return this.urlBaseAssets + tipoURL;
  }

}
