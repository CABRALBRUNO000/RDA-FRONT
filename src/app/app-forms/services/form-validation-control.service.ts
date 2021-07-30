import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationControl {

  constructor() { }


  findValid(formulario: any): any {
    Object.keys(formulario.controls).forEach((key) => {
      const controlValid = formulario.get(key).valid;
      if (!controlValid) {
        return console.log(`Key : ${key} keyValid: ${controlValid}`
        );
      }
      if (controlValid instanceof FormGroup) {
        this.findValid(key);
      }
    });
  }

  findErrors(formulario): any {
    Object.keys(formulario.controls).forEach((key) => {
      const controlErrors: ValidationErrors = formulario.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          return console.log(`Key control: ${key}, keyError: ${keyError} ${controlErrors[keyError]}`);
        });
      }
      if (controlErrors instanceof FormGroup) {
        this.findValid(key);
      }

    });
  }

  showValidations(campo: string, formulario: FormGroup): {} {
    return {
      'is-invalid':
         formulario.get(campo).touched &&  formulario.get(campo).errors,
      'is-valid':
         formulario.get(campo).touched &&
        !formulario.get(campo).errors,
    };
  }
  showValidationsGroup(campo: string, formulario: FormGroup): {} {
    return {
      'is-invalidRadios':
         formulario.get(campo).touched &&  formulario.get(campo).errors,
      'is-validRadios':
         formulario.get(campo).touched &&
        !formulario.get(campo).errors,
    };
  }


}
