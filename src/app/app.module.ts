import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdminUsersModule } from './adminUsers/adminUsers.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AppFormsModule } from './app-forms/app-forms.module';

import { Erro404Component } from './erro404/erro404.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BirthdayListComponent } from './components/birthdayList/birthdayList.component';

import { FiltroPersonalizadoService } from './app-forms/services/filtro-personalizado.service';
import { VoluntaryService } from './volunteers/services/voluntary.service';
import { InteractionsBetweenUsersComponent } from './components/interactions-between-users/interactions-between-users.component';
import { PeriodWithoutInteractionsComponent } from './components/period-without-interactions/period-without-interactions.component';
import { AuthService } from './login/auth.service';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    Erro404Component,
    LoginComponent,
    BirthdayListComponent,
    InteractionsBetweenUsersComponent,
    PeriodWithoutInteractionsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ImagekitioAngularModule.forRoot({
      publicKey: environment.PUBLICKEY,
      urlEndpoint: environment.URLENDPOINT,
      authenticationEndpoint: environment.authenticationEndpoint
    }),
    AdminUsersModule,
    AppFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VolunteersModule,
    BrowserAnimationsModule,
  ],
  providers: [
    VoluntaryService,
    FiltroPersonalizadoService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  exports: [MainComponent, BirthdayListComponent],
})
export class AppModule {}
