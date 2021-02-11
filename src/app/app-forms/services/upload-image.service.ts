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

  public upload(formulario: FormGroup, formControlName: string) {
    return this.http.post(
      'http://localhost:3000/img',
      this.toFormData(formulario, formControlName),
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  public toFormData<T>(formValue: FormGroup, formControlName: string) {


    const formData = new FormData();

    switch (formControlName) {
      case 'imgFilePrincipal':
        formData.append('image', formValue.value.imgFilePrincipal);
        break;
      case 'imgFileCartaIgreja':
        formData.append('image', formValue.value.imgFile.imgFileCartaIgreja);
        break;
      case 'imgFileComprovResidencia':
        formData.append('image', formValue.value.imgFile.imgFileComprovResidencia);
        break;
      case 'imgFileCPF':
        formData.append('image', formValue.value.imgFile.imgFileCPF);
        break;
      case 'imgFileRG':
        formData.append('image', formValue.value.imgFile.imgFileRG); 
        break;

      default:
        console.log(`formControlName RECEBIDO: ${formControlName} :::  não foi identificado o formControlName da imagem adicionada!`);
        
        break;
    }

    return formData;
  }

  public toResponseBody<T>() {
    return pipe(
      filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
      map((res: HttpResponse<T>) => res.body)
    );
  }

  public uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
      if (event.type === HttpEventType.UploadProgress) {
        cb(Math.round((100 * event.loaded) / event.total));
      }
    });
  }
}
