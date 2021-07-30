import { FormCadAdminUsersComponent } from './adminUsersForm/formCadAdminUsers/formCadAdminUsers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagekitioAngularModule } from 'imagekitio-angular';

import { FormCadMissionariesComponent } from './missionariesForm/formCadMissionaries/formCadMissionaries.component';
import { FiltrosComponent } from './volunteersForm/filtros/filtros.component';
import { FormCadComponent } from './volunteersForm/form-cad/form-cad.component';
import { environment } from 'src/environments/environment';
import { NgxMaskModule } from 'ngx-mask';
import { FormValidationControl } from './services/form-validation-control.service';
import { AdminService } from '../adminUsers/admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PipesModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URL_ENDPOINT,
    }),
    NgxMaskModule.forChild(),
  ],

  declarations: [
    FiltrosComponent,
    FormCadComponent,
    FormCadMissionariesComponent,
    FormCadAdminUsersComponent,
  ],
  providers: [FormValidationControl, AdminService],

  exports: [FiltrosComponent, FormCadComponent],
})
export class AppFormsModule {}
