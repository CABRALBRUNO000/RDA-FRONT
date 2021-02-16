import { FormCadAdminUsersComponent } from './adminUsersForm/formCadAdminUsers/formCadAdminUsers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from './../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagekitioAngularModule } from 'imagekitio-angular';

import { FormCadMissionariesComponent } from './missionariesForm/formCadMissionaries/formCadMissionaries.component';
import { FormCadPartnersComponent } from './partnersForm/formCadPartners/formCadPartners.component';
import { FiltrosComponent } from './volunteersForm/filtros/filtros.component';
import { FormCadComponent } from './volunteersForm/form-cad/form-cad.component';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URL_ENDPOINT,
      authenticationEndpoint: environment.authenticationEndpoint
    }),
  ],

  declarations: [
    FiltrosComponent,
    FormCadComponent,
    FormCadPartnersComponent,
    FormCadMissionariesComponent,
    FormCadAdminUsersComponent,
  ],

  exports: [FiltrosComponent, FormCadComponent],
})
export class AppFormsModule {}
