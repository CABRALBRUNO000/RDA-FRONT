import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageMissionariesComponent } from './myPageMissionaries/myPageMissionaries.component';
import { ListMissionariesComponent } from './listMissionaries/listMissionaries.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListMissionariesComponent, MyPageMissionariesComponent],
})
export class MissionariesModule {}
