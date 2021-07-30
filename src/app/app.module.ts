import { httpInterceptorProviders } from './http-interceptors/';
import { AuthGuard } from './shared/guards/auth.guard';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { AdminUsersModule } from './adminUsers/adminUsers.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AppFormsModule } from './app-forms/app-forms.module';

import { Erro404Component } from './shared/erro404/erro404.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';

import { FiltroPersonalizadoService } from './app-forms/services/filtro-personalizado.service';
import { VolunteersService } from './adminUsers/volunteers/services/volunteers.service';

import { AuthService } from './login/auth.service';
import { ImagekitioAngularModule } from 'imagekitio-angular';

import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { PublicPageModule } from './public-page/public-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    Erro404Component,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    SharedModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    PublicPageModule,
  ],
  providers: [
    VolunteersService,
    FiltroPersonalizadoService,
    AuthService,
    AuthGuard,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  exports: [MainComponent, ImagekitioAngularModule],
})
export class AppModule { }
