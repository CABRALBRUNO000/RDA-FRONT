import { PartnersRoutingModule } from './partners.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPagePartnersComponent } from '../adminUsers/partners/myPagePartners/myPagePartners.component';

@NgModule({
  imports: [
    CommonModule, PartnersRoutingModule
  ],
  declarations: [MyPagePartnersComponent]
})
export class PartnersModule { }
