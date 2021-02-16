import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient) {}

  // public upload(formulario: FormGroup, formControlName: string) {
  //   return this.http.post(
  //     'http://localhost:3000/img',
  //     this.toFormData(formulario, formControlName),
  //     {
  //       reportProgress: true,
  //       observe: 'events',
  //     }
  //   );
  // }


  // Este componente deverá ser utilizado para criação das requições de delete de imagens do banco de imagens, isso deverá ser relizado fazendo uma requisição para o bakend para o mesmo 
  //chamar a api do banco de imagens e realizar o delete da imagem dentro do banco

  
  
}
