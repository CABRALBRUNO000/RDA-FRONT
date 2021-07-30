import { MypageComponent } from './volunteers/mypage/mypage.component';
import { SharedModule } from './../shared/shared.module';
import { ListVolunteersComponent } from './volunteers/listVolunteers/listVolunteers.component';
import { ListMissionariesComponent } from './missionaries/listMissionaries/listMissionaries.component';
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
import { environment } from 'src/environments/environment';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  imports: [
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URL_ENDPOINT,
    }),
    CommonModule,
    BrowserAnimationsModule,
    AdminUsersRoutingModule,
// rotas que os adimnistradrores preisam de aceso mas fazem parte de outra entidade
    AppFormsModule,
    VolunteersModule,
    MissionariesModule,
    PipesModule,
    SharedModule

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
    ListVolunteersComponent,
    MypageComponent
    
 
    
  ],
  exports: [SideBarComponent],
})
export class AdminUsersModule {}
