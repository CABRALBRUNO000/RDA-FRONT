import { MissionariesRoutingModule } from './missionaries.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageMissionariesComponent } from './myPageMissionaries/myPageMissionaries.component';
import { ListMissionariesComponent } from './listMissionaries/listMissionaries.component';

@NgModule({
  imports: [CommonModule, MissionariesRoutingModule ],
  declarations: [ListMissionariesComponent, MyPageMissionariesComponent],
  exports:[ListMissionariesComponent]
})
export class MissionariesModule {}
