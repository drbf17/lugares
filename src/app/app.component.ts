import { Component } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap';

import { Lugar } from './locais-caixa/share/lugar';
import { PontosDeAtendimentoService } from './locais-caixa/services/pontos-de-atendimento.service';
import {TiposPontoAtendimentoService} from './locais-caixa/places-filter/services/tipos-ponto-atendimento.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public latitude: number = -15.8029543;
  public longitude: number = -47.8832106;
  public zoom: number = 16;
  public servico: string;
  public tiposLocais: string[];
  public lugares: Lugar[] ;
  public showMapTab: boolean = true;
  public iscolapsed: boolean = true;
  public exibeBanking: boolean = false;
  public urlBanking : string;


constructor(private pontosDeAtendimentoService : PontosDeAtendimentoService,
private tiposPontoAtendimentoService: TiposPontoAtendimentoService){}

  ngOnInit() {

    this.tiposLocais = this.tiposPontoAtendimentoService.getTiposDePontos().map(tiposPontos => 
       tiposPontos.itemName
    );

   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
       this.latitude = position.coords.latitude;
       this.longitude = position.coords.longitude;       
        console.log(position.coords); 
      }, error => console.log(error));

      console.log("Não é possível capturar a localização. Acesso negado"); 
   }

   else {

       console.log("Não é possível capturar a localização. Navegador parece não dar suporte à funcionalidade");

   }

    this.changeMap();

  }



  public onChangeCenter(valor: any) {

    console.log(valor);

    this.latitude = valor.latitude;
    this.longitude = valor.longitude;
    this.changeMap();

  }

  public onChangeFilter(valor: any) {
    console.log(valor);

    this.tiposLocais = valor.tipos;
    this.servico = valor.servico;
    this.urlBanking = valor.url;
    console.log("url");
    console.log(this.urlBanking );
    console.log(valor);
    this.exibeBanking = this.tiposLocais.indexOf('Internet Banking') > -1 ? true : false;    
    this.changeMap();
  }

  private changeMap(){
    
    this.pontosDeAtendimentoService.getLocais(this.latitude, this.longitude,
    this.tiposLocais, this.servico).subscribe(
      
      lugares => this.lugares = lugares,
      error => console.log(error)
    )

  }

  public urlLink(tipo: string): string {
    
    return this.pontosDeAtendimentoService.urlLink(tipo);
  }

  public onUrlBanking() {
    
     window.open(this.urlBanking, "_blank");
  }

  public ChangeCenterView(event){
console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

    this.changeMap();

  }

  
}



