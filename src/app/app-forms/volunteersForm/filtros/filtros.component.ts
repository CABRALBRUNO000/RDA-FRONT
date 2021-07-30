import { Component, OnInit, OnChanges } from '@angular/core';

import { FiltroPersonalizadoService } from 'src/app/app-forms/services/filtro-personalizado.service';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['../../../app.component.css', './filtros.component.css'],
  providers: [FiltroPersonalizadoService],
})
export class FiltrosComponent implements OnInit, OnChanges {
  public filteredVolunteers: VoluntaryModel[];
  public registros: any;

  constructor(private filtroPersonalizado: FiltroPersonalizadoService) {}

  ngOnInit(): void {

    // function quantVolunteersfiltered(array) {
    //   array.length;
    // }
    // this.registros = quantVolunteersfiltered(this.filteredVolunteers);
  }
  ngOnChanges(): void {}

  public filtrarApi(termo: string, campo: string): void {
    if (termo.trim() === '') {
      this.filteredVolunteers = [];
    } else {
      this.filtroPersonalizado
        .buscaPorFiltro(termo, campo)
        .then(
          (resposta: VoluntaryModel[]) => (this.filteredVolunteers = resposta)
        )
        .catch((err) => console.log('ERRO', err));
      console.log('voluntários filtrados', this.filteredVolunteers);
      console.log('termo', termo);
      console.log('campo', campo);
    }
  }
}
