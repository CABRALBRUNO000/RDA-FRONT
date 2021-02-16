import { PartnersRoutingModule } from './partners.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPagePartnersComponent } from './myPagePartners/myPagePartners.component';
import { ListPartnersComponent } from './listPartners/listPartners.component';

@NgModule({
  imports: [
    CommonModule, PartnersRoutingModule
  ],
  declarations: [ListPartnersComponent, MyPagePartnersComponent]
})
export class PartnersModule { }
