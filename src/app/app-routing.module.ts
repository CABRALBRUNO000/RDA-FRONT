import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersRoutingModule } from './adminUsers/adminUsers.routing.module'; 
import { VolunteersRoutingModule } from './volunteers/volunteers.routing.module';
import { AppFormsRoutingModule } from './app-forms/app-forms.routing.module';
import { PartnersRoutingModule } from './partners/partners.routing.module';
import { MissionariesRoutingModule } from './missionaries/missionaries.routing.module';

import { MainComponent } from './main/main.component';
import { Erro404Component } from './erro404/erro404.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [];

@NgModule({
  imports: [
    VolunteersRoutingModule,
    AppFormsRoutingModule,
    PartnersRoutingModule,
    MissionariesRoutingModule,
    AdminUsersRoutingModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
        { path: 'Dashboard', component: MainComponent, canActivate:[AuthGuard] },
        { path: 'LoginUser', component: LoginComponent },
        { path: '**', component: Erro404Component, canActivate:[AuthGuard] },
        
    
      ],
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
