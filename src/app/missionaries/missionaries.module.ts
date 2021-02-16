import { MissionariesRoutingModule } from './missionaries.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageMissionariesComponent } from '../adminUsers/missionaries/myPageMissionaries/myPageMissionaries.component';
import { ListMissionariesComponent } from './../adminUsers/missionaries/listMissionaries/listMissionaries.component';

@NgModule({
  imports: [CommonModule, MissionariesRoutingModule ],
  declarations: [ListMissionariesComponent, MyPageMissionariesComponent],
  exports:[ListMissionariesComponent]
})
export class MissionariesModule {}
