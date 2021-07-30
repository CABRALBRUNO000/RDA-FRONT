import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../shared/guards/auth.guard';

import { FormCadVolunteersResolverGuard } from './../shared/guards/form-cad-volunteers-resolver.guard';
import { MypageComponent } from './../adminUsers/volunteers/mypage/mypage.component';
import { HomePageVoluntaryComponent } from './home-page-voluntary/home-page-voluntary.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'voluntary/:id',
        component: MypageComponent, canActivate:[AuthGuard],
        resolve: {
          voluntary: FormCadVolunteersResolverGuard,
        },
      },
      {
        path: 'homeVoluntary/:id',
        component: HomePageVoluntaryComponent, canActivate:[AuthGuard]
      },
    ]),
  ],
  exports: [RouterModule],
})
export class VolunteersRoutingModule {}
