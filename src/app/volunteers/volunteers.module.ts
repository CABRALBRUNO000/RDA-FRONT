import { VolunteersRoutingModule } from './volunteers.routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';

import { VoluntaryService } from './services/voluntary.service';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from 'src/environments/environment';

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
  declarations: [ ],
  providers: [VoluntaryService],
})
export class VolunteersModule {}
