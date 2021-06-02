import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { toFormData } from 'src/app/app-forms/fileUpload/toFormData';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import { environment } from '../../../../environments/environment';


@Injectable()
export class VolunteersService {
  private readonly API = `${environment.API}/volunteers`;
  constructor(private http: HttpClient) {}

  // pega todos os voluntários
  public getVolunteers(): Observable<VoluntaryModel[]> {
    return this.http.get<VoluntaryModel[]>(`${this.API}`).pipe(take(1));
  }
  // Busca os dados do voluntário pelo seu ID
  public getVolunteersPorId(id: string): Observable<VoluntaryModel> {
    return this.http.get<VoluntaryModel>(`${this.API}/${id}`).pipe(take(1));
  }

  // CAMPO DE BUSCA na tela principal (precisa de ajuste)
  public searchVolunteer(termo: string): Observable<VoluntaryModel[]> {
    return this.http
      .get(`${this.API}/voluntary?termoBusca=${termo}`)
      .pipe(retry(10))
      .pipe(map((resposta: any) => resposta));
  }

  // Headers para fazer o post e o put
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data; boundary=<--- ::::>"}),
  };

  // CADASTRO VOLUNTÁRIOS
  public saveVolunteer(voluntary: VoluntaryModel): Observable<VoluntaryModel> {

    return this.http
      .post<VoluntaryModel>(
        `${this.API}`,
        toFormData(voluntary)
      )
      .pipe(retry(2), catchError(this.handleError))
      .pipe(take(1))
  }

  // Atualiza um voluntário
  public updateVolunteerID(
    voluntary: VoluntaryModel
  ): Observable<VoluntaryModel> {
    return this.http
      .put<VoluntaryModel>(
        `${this.API}/${voluntary._id}`,
        toFormData(voluntary)
      )
      .pipe(retry(2), catchError(this.handleError))
      .pipe(take(1));
  }

  // deleta um voluntário
  public deleteVolunteer(voluntary: VoluntaryModel) {
    return this.http
      .delete<VoluntaryModel>(`${this.API}/${voluntary._id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .pipe(take(1));
  }

  // Manipulação de erros
  public handleError(error: HttpErrorResponse) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      Object.assign(errorMessage, { ErroMensagem: error.error.message })

    } else {
      // Erro ocorreu no lado do servidor
      Object.assign(errorMessage, { StatusCode: error.status })
          //  `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }


    return throwError(errorMessage);
  }
}
