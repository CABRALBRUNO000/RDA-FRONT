import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPagePartnersComponent } from './myPagePartners/myPagePartners.component';
import { ListPartnersComponent } from './listPartners/listPartners.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListPartnersComponent, MyPagePartnersComponent]
})
export class PartnersModule { }
