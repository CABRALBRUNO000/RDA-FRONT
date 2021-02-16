import { PartnersRoutingModule } from './partners.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPagePartnersComponent } from '../adminUsers/partners/myPagePartners/myPagePartners.component';
import { ListPartnersComponent } from './../adminUsers/partners/listPartners/listPartners.component';

@NgModule({
  imports: [
    CommonModule, PartnersRoutingModule
  ],
  declarations: [ListPartnersComponent, MyPagePartnersComponent]
})
export class PartnersModule { }
