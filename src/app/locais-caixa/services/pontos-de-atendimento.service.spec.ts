import { TestBed, inject } from '@angular/core/testing';

import { PontosDeAtendimentoService } from './pontos-de-atendimento.service';

describe('PontosDeAtendimentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PontosDeAtendimentoService]
    });
  });

  it('should be created', inject([PontosDeAtendimentoService], (service: PontosDeAtendimentoService) => {
    expect(service).toBeTruthy();
  }));
});
