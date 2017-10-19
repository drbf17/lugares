import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocaisCaixaModule, } from './locais-caixa/locais-caixa.module';
import { PontosDeAtendimentoService } from './locais-caixa/services/pontos-de-atendimento.service';
import {TiposPontoAtendimentoService} from './locais-caixa/places-filter/services/tipos-ponto-atendimento.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBRAuthSeGQRnm7xx3KJLGHpqeGeUo6RtQ",
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
    LocaisCaixaModule
  ],
  providers: [PontosDeAtendimentoService, TiposPontoAtendimentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
