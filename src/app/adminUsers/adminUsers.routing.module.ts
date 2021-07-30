import { SideBarComponent } from './sideBar/sideBar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyPageAdminUsersComponent } from './myPageAdminUsers/myPageAdminUsers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminUsersComponent } from './listAdminUsers/listAdminUsers.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ListMissionariesComponent } from '../adminUsers/missionaries/listMissionaries/listMissionaries.component';
import { ListVolunteersComponent } from './volunteers/listVolunteers/listVolunteers.component';
import { MypageComponent } from './../adminUsers/volunteers/mypage/mypage.component';
import { FormCadVolunteersResolverGuard } from './../shared/guards/form-cad-volunteers-resolver.guard';
import { FiltrosComponent } from '../app-forms/volunteersForm/filtros/filtros.component';
import { FormCadComponent } from '../app-forms/volunteersForm/form-cad/form-cad.component';
import { FormCadAdminUsersComponent } from '../app-forms/adminUsersForm/formCadAdminUsers/formCadAdminUsers.component';
import { FormCadMissionariesComponent } from '../app-forms/missionariesForm/formCadMissionaries/formCadMissionaries.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'LoginUser', pathMatch: 'full' },
      {
        path: 'sideBar',
        component: SideBarComponent,
         canActivate: [AuthGuard],
        children: [
          //ADMINISTRADORES
          {
            path: 'Dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'listAdminUsers',
            component: ListAdminUsersComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'myPageAdminUsers/:id',
            component: MyPageAdminUsersComponent,
            resolve: {
              // voluntary: FormCadVolunteersResolverGuard,
            },
            canActivate: [AuthGuard],
          },

          //VOLUNTÁRIOS
          {
            path: 'listVolunteers',
            component: ListVolunteersComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'voluntary/:id',
            component: MypageComponent,
            canActivate: [AuthGuard],
            resolve: {
              voluntary: FormCadVolunteersResolverGuard,
            },
          },

          //MISISONÁRIOS
          {
            path: 'listMissionaries',
            component: ListMissionariesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'myPageMissionaries/:id',
            component: FormCadMissionariesComponent,
            canActivate: [AuthGuard],
            resolve: {
              // voluntary: FormCadVolunteersResolverGuard,
            },
          },
         

          //FORMULÁRIOS

          {
            path: 'formCadAdminUsers',
            component: FormCadAdminUsersComponent,
            resolve: {
              //  voluntary: FormCadAdminUsersResolverGuard,
            },
          },
          {
            path: 'formCadAdminUsers/:id',
            component: FormCadAdminUsersComponent,
            canActivate: [AuthGuard],
            resolve: {
              // voluntary: FormCadAdminUsersResolverGuard,
            },
          },

          {
            path: 'formCadMissionaries',
            component: FormCadMissionariesComponent,
            resolve: {
              //  voluntary: FormCadAdminUsersResolverGuard,
            },
          },
          {
            path: 'formCadMissionaries/:id',
            component: FormCadMissionariesComponent,
            canActivate: [AuthGuard],
            resolve: {
              // voluntary: FormCadAdminUsersResolverGuard,
            },
          },

          {
            path: 'formCadVoluntary',
            component: FormCadComponent,
            resolve: {
              voluntary: FormCadVolunteersResolverGuard,
            },
          },
          {
            path: 'formCadVoluntary/:id',
            component: FormCadComponent,
            canActivate: [AuthGuard],
            resolve: {
              voluntary: FormCadVolunteersResolverGuard,
            },
          },
          {
            path: 'filtros',
            component: FiltrosComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
