import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { HttpModule } from '@angular/http';

import {TiposPontoAtendimentoService} from './places-filter/services/tipos-ponto-atendimento.service';
import {ServicosService} from './places-filter/services/servicos.service'
import {PontosDeAtendimentoService} from './services/pontos-de-atendimento.service'

import { PlacesAutocompleteComponent } from './places-autocomplete/places-autocomplete.component';
import { MapViewComponent } from './map-view/map-view.component';
import { PlacesFilterComponent } from './places-filter/places-filter.component';




@NgModule({
  imports: [
    CommonModule,
     AgmCoreModule.forRoot({
      apiKey: "AIzaSyBRAuthSeGQRnm7xx3KJLGHpqeGeUo6RtQ",
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    Ng2AutoCompleteModule,
    HttpModule
    
  ],
  declarations: [PlacesAutocompleteComponent, MapViewComponent, PlacesFilterComponent],
  exports: [PlacesAutocompleteComponent, MapViewComponent, PlacesFilterComponent],
  providers: [TiposPontoAtendimentoService, ServicosService, PontosDeAtendimentoService],
  
})
export class LocaisCaixaModule { }
