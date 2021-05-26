import { environment } from './../../../../environments/environment'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError, take } from 'rxjs/operators';
import { AdministratorModel } from 'src/app/shared/entities/administrator.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API = environment.API;
  constructor(
    private http: HttpClient
  ) { }

  public saveUser(user: AdministratorModel): Observable<AdministratorModel> {

    return this.http
      .post<AdministratorModel>(
        `${this.API}`,
        this.toFormData(user)
      )
      .pipe(retry(2), catchError(this.handleError))
      .pipe(take(1))
  }


  toFormData<T>(formValue: AdministratorModel): FormData {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
      if (formValue instanceof File) { formData.append('imgAdmin', key, value) };
    }
    // if (formValue.imgAdmin != null) {
    //   formData.append(
    //     'imgAdmin',
    //     formValue.imgAdmin[0],
    //     formValue.imgAdmin.name
    //   );
    // }

    return formData;
  }

  // Manipulação de erros
  public handleError(error: HttpErrorResponse): Observable<never> {
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
