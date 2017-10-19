import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';

@Injectable()
export class ServicosService {

  private  url: string = 'http://localhost:9200/servicos_v5/servicos/_search';

   
  constructor(public http: Http) { }


  public getListaServicos (keyword: any): Observable<any[]>{

     
    if (keyword) {
      return this.http.post(this.url, {
        "_source": ["nome", "descricao", "atendimento", "url"],
        "query": {
          "bool": {
            "should": [
              {
                "match": {
                  "nome.autocomplete": {
                    "query": keyword
                  }
                }
              },
              { "match": { "descricao.autocomplete": keyword } }]
          }
        },
        "highlight": {
          "fields": {
            "nome.autocomplete": {}
          }
        }
      })
        .map(res => {
          let json = res.json(); 
          console.log("json.hits.hits");  
          console.log(json.hits.hits);   
          return json.hits.hits.map( val =>{
            console.log("xxxxffff");
            console.log(val);
            return {nome:  val._source.nome,
                    descricao: val._source.descricao,
                    atendimento: val._source.atendimento,
                    url: val._source.url}
          } );
        })
    } else {
      return Observable.of([]);
    }
  }

}
