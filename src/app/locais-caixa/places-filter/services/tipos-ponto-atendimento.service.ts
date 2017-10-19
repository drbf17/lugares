import { Injectable } from '@angular/core';

@Injectable()
export class TiposPontoAtendimentoService {

  private _tiposDePontos = [
      { "id": 1, "itemName": "Agência" },
      { "id": 2, "itemName": "Banco24Horas" },
      { "id": 3, "itemName": "Caixa Eletrônico" },
      { "id": 4, "itemName": "Correspondente CAIXA Aqui" },
      { "id": 5, "itemName": "Lotéricas" },

    ];

  constructor() { }

  
  public getTiposDePontos() : any[] {

    return this._tiposDePontos;
    
  }

  

}
