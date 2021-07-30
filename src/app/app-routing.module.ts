import { SideBarComponent } from './adminUsers/sideBar/sideBar.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersRoutingModule } from './adminUsers/adminUsers.routing.module';
import { VolunteersRoutingModule } from './volunteers/volunteers.routing.module';
import { AppFormsRoutingModule } from './app-forms/app-forms.routing.module';
import { MissionariesRoutingModule } from './missionaries/missionaries.routing.module';

import { MainComponent } from './main/main.component';
import { Erro404Component } from './shared/erro404/erro404.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [];

@NgModule({
  imports: [
    VolunteersRoutingModule,
    AppFormsRoutingModule,
    MissionariesRoutingModule,
    AdminUsersRoutingModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'sideBar', pathMatch: 'full' },

        { path: 'LoginUser', component: LoginComponent },
        { path: '**', component: Erro404Component, canActivate:[AuthGuard] },


      ],
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
