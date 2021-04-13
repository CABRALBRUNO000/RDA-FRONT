import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VoluntaryModel } from './../voluntary.model';
import { VoluntaryService } from './../../volunteers/services/voluntary.service';

@Injectable({
  providedIn: 'root',
})
export class FormCadVolunteersResolverGuard implements Resolve<VoluntaryModel> {
  constructor(private voluntaryService: VoluntaryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VoluntaryModel> {
    const idVoluntary = route.params['id'];
     console.log(idVoluntary);

    if (route.params && idVoluntary) {
      return this.voluntaryService.getVolunteersPorId(idVoluntary);
    }

    return of({
      _id: null,
      nome: '',
      dataNascimento: '',
      sexo: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        complemento: '',
        uf: '',
        CEP: '',
      profissao: '',
      telefone: '',
      telefoneFx: '',
      estadoCivil:'',
      email: '',
      password:'',
      password2:'',
      imgFilePrincipal:null ,
      imgsCasaDescansoFile:null,
      imgFileCasaDescansoPrincipal:null,
      nomeIg: '',
      pastor: '',
      chekbox1Profissao: false,
      chekbox2Intercessor: false,
      chekbox3Cuidador: false,
      chekbox4CasaDescanso: false,
      chekbox5Aconselhamento: false,
      especialidade: '',
      urlsImage: {
        urlImgPrincipal: '',
        urlImgCasaDescansoPrincipal: '',
        urlImgsCasaDescanso:[]
      },
      servicoOferecido: '',
      dataCad: '',
      status: '',
      localDescanso: {
        casaDePraia: false,
        casaDeCampo: false,
        pousada: false,
        hotel: false,
        outros: false,
        nomeLocalDescanso:'',
        CNPJLocalDescanso:'',
        ruaLocalDescanso:'',
        numeroLocalDescanso:'',
        complementoLocalDescanso:'',
        CEPLocalDescanso:'',
        bairroLocalDescanso:'',
        cidadeLocalDescanso:'',
        ufLocalDescanso:'',
        disponibilidadeDuranteAno:true,
        mesesNaoDisponivel:'',
        mesesNaoDisponivelDescrito:'',
        maximoDiariaPg:'',
        maximoHospedesPorVez:'',
        qtFamiliaMes:'',
        custoHospedagem:'',
        valorHospedagem:'',
        alimentacao:false,
        custoAlimentacao:'',
        valorRefeicoes:'',
        roupaCama:false,
        qtQuartos:'',
        qtSuites:'',
        qtCamas:'',
        servicosDisponibilizados:{
          piscina:false,
          quadra:false,
          restaurante:false,
          TV:false,
          internet:false,
          garagem:false,
          outros:false,
          outrosServicosOferecidos:'',
        }
      }
    });
  }
}
