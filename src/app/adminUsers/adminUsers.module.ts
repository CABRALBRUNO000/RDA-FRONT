import { ListVolunteersComponent } from './volunteers/listVolunteers/listVolunteers.component';
import { ListPartnersComponent } from './partners/listPartners/listPartners.component';
import { ListMissionariesComponent } from './missionaries/listMissionaries/listMissionaries.component';
import { PartnersModule } from './../partners/partners.module';
import { VolunteersModule } from './../volunteers/volunteers.module';
import { AppFormsModule } from './../app-forms/app-forms.module';
import { MissionariesModule } from './../missionaries/missionaries.module';
import { AdminUsersRoutingModule } from './adminUsers.routing.module';
import { SideBarComponent } from './sideBar/sideBar.component';
import { PeriodWithoutInteractionsComponent } from './dashboard/components/period-without-interactions/period-without-interactions.component';
import { InteractionsBetweenUsersComponent } from './dashboard/components/interactions-between-users/interactions-between-users.component';
import { BirthdayListComponent } from './dashboard/components/birthdayList/birthdayList.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListAdminUsersComponent } from './listAdminUsers/listAdminUsers.component';
import { MyPageAdminUsersComponent } from './myPageAdminUsers/myPageAdminUsers.component';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AdminUsersRoutingModule,
// rotas que os adimnistradrores preisam de aceso mas fazem parte de outra entidade
    AppFormsModule,
    VolunteersModule,
    MissionariesModule,
    PartnersModule,
    PipesModule

  ],
  declarations: [
    MyPageAdminUsersComponent,
    ListAdminUsersComponent,
    DashboardComponent,
    BirthdayListComponent,
    InteractionsBetweenUsersComponent,
    PeriodWithoutInteractionsComponent,
    SideBarComponent,
    ListMissionariesComponent,
    ListPartnersComponent,
    ListVolunteersComponent
    
  ],
  exports: [SideBarComponent],
})
export class AdminUsersModule {}
