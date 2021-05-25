import { VolunteersRoutingModule } from './volunteers.routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';

import { UserService } from '../services/users.service';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from 'src/environments/environment';
import { HomePageVoluntaryComponent } from './home-page-voluntary/home-page-voluntary.component';

@NgModule({
  imports: [CommonModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URL_ENDPOINT,
    }),
     RouterModule, 
     PipesModule, 
     VolunteersRoutingModule, 
    ],
  declarations: [ 
    HomePageVoluntaryComponent
  ],
  providers: [UserService],
})
export class VolunteersModule {}
