import { MissionariesRoutingModule } from './missionaries.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageMissionariesComponent } from '../adminUsers/missionaries/myPageMissionaries/myPageMissionaries.component';
import { HomePageMissionaryComponent } from './home-page-missionary/home-page-missionary.component';

@NgModule({
  imports: [CommonModule, MissionariesRoutingModule ],
  declarations: [MyPageMissionariesComponent, HomePageMissionaryComponent],
  exports:[]
})
export class MissionariesModule {}
