import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../shared/guards/auth.guard';

import { FormCadVolunteersResolverGuard } from './../shared/guards/form-cad-volunteers-resolver.guard';
import { ListVolunteersComponent } from '../adminUsers/volunteers/listVolunteers/listVolunteers.component';
import { MypageComponent } from './../adminUsers/volunteers/mypage/mypage.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'listVolunteers', component: ListVolunteersComponent, canActivate:[AuthGuard] },
      {
        path: 'voluntary/:id',
        component: MypageComponent, canActivate:[AuthGuard],
        resolve: {
          voluntary: FormCadVolunteersResolverGuard,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class VolunteersRoutingModule {}
