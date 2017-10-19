import { TestBed, inject } from '@angular/core/testing';

import { TiposPontoAtendimentoService } from './tipos-ponto-atendimento.service';

describe('TiposPontoAtendimentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposPontoAtendimentoService]
    });
  });

  it('should be created', inject([TiposPontoAtendimentoService], (service: TiposPontoAtendimentoService) => {
    expect(service).toBeTruthy();
  }));
});
