import { ImagekitioAngularModule } from 'imagekitio-angular';
import { CarouselComponent } from './carousel/carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';


@NgModule({
  imports: [
    CommonModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URL_ENDPOINT,
    }),
  ],
  exports: [CarouselComponent],
  declarations: [CarouselComponent],
})
export class SharedModule { }
