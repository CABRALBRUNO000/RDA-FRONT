import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';

@Injectable({
  providedIn: 'root',
})
export class FiltroPersonalizadoService {
  constructor(private http: HttpClient) {}

  /**
   * dentro do componente de filtros esse será o primeiro filtro, é responsável por fazer busca NA API
   */
  public buscaPorFiltro(
    termo: string,
    campo: string
  ): Promise<VoluntaryModel[]> {
    return this.http
      .get(`api/volunteers/voluntary?termoBusca=${termo}`)
      .toPromise()
      .then((resposta: any) => resposta)
      .catch((erro) => console.log(erro));
  }
}
