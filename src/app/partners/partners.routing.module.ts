import { AuthGuard } from './../guards/auth.guard';
import { MyPagePartnersComponent } from './myPagePartners/myPagePartners.component';
import { ListPartnersComponent } from './listPartners/listPartners.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'listPartners', component: ListPartnersComponent, canActivate:[AuthGuard] },
      {
        path: 'myPagePartners/:id',
        component: MyPagePartnersComponent, canActivate:[AuthGuard],
        resolve: {
          // voluntary: FormCadVolunteersResolverGuard,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PartnersRoutingModule {}
