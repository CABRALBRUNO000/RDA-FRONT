import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdministratorModel } from '../entities/administrator.model';
import { UserService } from '../../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class FormCadAdministratorsResolverGuard implements Resolve<AdministratorModel> {
  constructor(private userSevice: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AdministratorModel> {
    const idAdministrator = route.params.id;
    console.log(idAdministrator);

    if (route.params && idAdministrator) {
      return this.userSevice.getUsersPorId(idAdministrator);
    }

    return of({
      _id: null,
      typeUser: 'ADMINISTRATOR',
      nome: '',
      dataNascimento: '',
      sexo: '',
      email: '',
      password: '',
      password2: '',
      dataCad: '',
      status: '',
    });
  }
}
