import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPageRoutingModule } from './public-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    PublicPageRoutingModule
  ]
})
export class PublicPageModule { }
