import { Component, OnInit, Input } from '@angular/core';

import { Lugar } from '../share/lugar';
import { PontosDeAtendimentoService } from '../services/pontos-de-atendimento.service'


@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  @Input()
  public latitude: number;
  @Input()
  public longitude: number;
  @Input()
  public zoom: number = 12;
  @Input()
  public lugares: Lugar[];

  private urlBase: string = '/assets/';


  constructor(private pontosDeAtendimentoService: PontosDeAtendimentoService) { }

  ngOnInit() {
  }

  public urlLink(tipo: string): string {
    
    return this.pontosDeAtendimentoService.urlLink(tipo);
  }

}
