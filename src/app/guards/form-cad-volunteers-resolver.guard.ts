import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VoluntaryModel } from '../shared/voluntary.model';
import { VoluntaryService } from '../volunteers/services/voluntary.service';


@Injectable({
  providedIn: 'root',
})
export class FormCadVolunteersResolverGuard implements Resolve<VoluntaryModel> {

  constructor(private voluntaryService: VoluntaryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  Observable<VoluntaryModel>  {
    const idVoluntary = route.params['id']
    console.log(idVoluntary);

    if (route.params && idVoluntary) {

     return this.voluntaryService.getVolunteersPorId(idVoluntary)
    }

    return of({
      _id: null,
      nome: '',
      dataNascimento: '',
      sexo: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        complemento: '',
        uf: '',
        CEP: '',
      },
      profissao: '',
      telefone: '',
      telefoneFx: '',
      email: '',
      imgUrlPrincipal: '',
      nomeIg: '',
      pastor: '',
      chekbox1Profissao: false,
      chekbox2Intercessor: false,
      chekbox3Cuidador: false,
      chekbox4: false,
      chekbox5Aconselhamento: false,
      especialidade: '',
      servicoOferecido: '',
      imagesDocUrl: {
        imgRG: '',
        imgCPF: '',
        imgComprovResidencia: '',
        imgCartaIgreja: '',
      },
      dataCad: '',
      status: ''
     });
  }
}
