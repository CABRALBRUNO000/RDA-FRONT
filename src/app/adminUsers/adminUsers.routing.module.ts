import { MyPageAdminUsersComponent } from './myPageAdminUsers/myPageAdminUsers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminUsersComponent } from './listAdminUsers/listAdminUsers.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'listAdminUsers', component: ListAdminUsersComponent, canActivate:[AuthGuard]},
      {
        path: 'myPageAdminUsers/:id',
        component: MyPageAdminUsersComponent,
        resolve: {
          // voluntary: FormCadVolunteersResolverGuard,
        }, canActivate:[AuthGuard]
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
