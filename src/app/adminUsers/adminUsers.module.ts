import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAdminUsersComponent } from './listAdminUsers/listAdminUsers.component';
import { MyPageAdminUsersComponent } from './myPageAdminUsers/myPageAdminUsers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyPageAdminUsersComponent, ListAdminUsersComponent]
})
export class AdminUsersModule { }
