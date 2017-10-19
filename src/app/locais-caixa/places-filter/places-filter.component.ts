import { element } from 'protractor';
import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';

import { TiposPontoAtendimentoService } from './services/tipos-ponto-atendimento.service';
import { ServicosService } from './services/servicos.service'


@Component({
  selector: 'places-filter',
  templateUrl: './places-filter.component.html',
  styleUrls: ['./places-filter.component.css']
})
export class PlacesFilterComponent implements OnInit {


  //Variáveis para o Componente de seleção de pontos de atendimento
  public agenciaChecked: boolean = true;
  public b24horasChecked: boolean = true;
  public aquiChecked: boolean = true;
  public atmChecked: boolean = true;
  public lotericaChecked: boolean = true;


  //Variável para o componente de seleção de serviços
  public selected;

  //Comunica ao componete pai mudanças nos parâmetros
  @Output()
  public onFiltro = new EventEmitter();



  constructor(public http: Http,
    private tiposPontoAtendimentoService: TiposPontoAtendimentoService,
    private servicosService: ServicosService) { }

  ngOnInit() {

  }



  //Vincula o serviço que retorna a lista de pesquisa
  observableSource = (dados => this.servicosService.getListaServicos(dados));

  //Funções do componente de seleção de serviços
  servicoListFormatter(data: any): string {

    return `${data.nome}`;
  }

  servicoValueFormatter(data: any): string {

    return `${data.nome}`;
  }

  servicoOnValueChanged(data: any) {

    this.emitirEventoFiltro();
  }





  //Comunica ao componete pai mudanças nos parâmetros
  private emitirEventoFiltro() {

    let tiposPontos = [];
    let servicoSelecionado: string = null;
    let retorno = {
      tipos: [],
      servico: null,
      url: null
    };


    if (this.agenciaChecked)
      tiposPontos.push("Agência");
    if (this.b24horasChecked)
      tiposPontos.push("Banco24Horas");
    if (this.aquiChecked)
      tiposPontos.push("Correspondente CAIXA Aqui");
    if (this.atmChecked)
      tiposPontos.push("Caixa Eletrônico");
    if (this.lotericaChecked)
      tiposPontos.push("Lotérica");

    console.log("tiposPontos");
    console.log(tiposPontos);

    if (tiposPontos) {

      if (this.selected && this.selected.atendimento) {

        console.log("this.selected.tipos");
        console.log(this.selected.atendimento);

        //Mantém apenas os tipos de estabelecimento selecionados em tela e que atendem o serviço.

        tiposPontos.forEach(element => {
          if (this.selected.atendimento.indexOf(element) > -1) {
            retorno.tipos.push(element)
          }
        });

       if ( this.selected.atendimento.indexOf("Internet Banking") > -1){
          retorno.tipos.push("Internet Banking");
       }
      }

      else {
        retorno.tipos = tiposPontos;
      }

    }

    if (this.selected && this.selected.nome) {
      retorno.servico = this.selected.nome;
    }

    if (this.selected && this.selected.url){
      retorno.url = this.selected.url;
    }

    console.log("retorno");
    console.log(retorno);
    this.onFiltro.emit(retorno);

  }


}
