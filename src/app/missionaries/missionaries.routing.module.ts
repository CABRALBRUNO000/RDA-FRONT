import { AuthGuard } from './../shared/guards/auth.guard';
import { MyPageMissionariesComponent } from '../adminUsers/missionaries/myPageMissionaries/myPageMissionaries.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'myPageMissionaries/:id',
        component: MyPageMissionariesComponent, canActivate:[AuthGuard],
        resolve: {
          // voluntary: FormCadVolunteersResolverGuard,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MissionariesRoutingModule {}
