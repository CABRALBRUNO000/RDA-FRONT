import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError, take } from 'rxjs/operators';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';

import { toFormData } from 'src/app/app-forms/fileUpload/toFormData';

@Injectable()
export class UserService {
  private readonly API = environment.API;
  constructor(private http: HttpClient) {}

  // pega todos os voluntários
  public getUsers(): Observable<VoluntaryModel[]> {
    return this.http.get<VoluntaryModel[]>(`${this.API}`).pipe(take(1));
  }
  // Busca os dados do voluntário pelo seu ID
  public getUsersPorId(id: string): Observable<VoluntaryModel> {
    return this.http.get<VoluntaryModel>(`${this.API}/${id}`).pipe(take(1));
  }

  // CAMPO DE BUSCA na tela principal (precisa de ajuste)
  public searchUser(termo: string): Observable<VoluntaryModel[]> {
    return this.http
      .get(`${this.API}/voluntary?termoBusca=${termo}`)
      .pipe(retry(10))
      .pipe(map((resposta: any) => resposta));
  }

  // Headers para fazer o post de o put
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data; boundary=<--- ::::>"}),
  };

  // CADASTRO VOLUNTÁRIOS
  public saveUser(voluntary: VoluntaryModel): Observable<VoluntaryModel> {

    return this.http
      .post<VoluntaryModel>(
        `${this.API}`,
        toFormData(voluntary)
      )
      .pipe(retry(2), catchError(this.handleError))
      .pipe(take(1))
  }

  // Atualiza um voluntário
  public updateUserID(
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
  public deleteUser(voluntary: VoluntaryModel) {
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
