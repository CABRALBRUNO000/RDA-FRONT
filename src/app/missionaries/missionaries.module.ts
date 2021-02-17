import { MissionariesRoutingModule } from './missionaries.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageMissionariesComponent } from '../adminUsers/missionaries/myPageMissionaries/myPageMissionaries.component';

@NgModule({
  imports: [CommonModule, MissionariesRoutingModule ],
  declarations: [MyPageMissionariesComponent],
  exports:[]
})
export class MissionariesModule {}
