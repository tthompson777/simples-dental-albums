import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimplesDentalModule } from './simples-dental.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { RegisterComponent } from '../app/register/register.component';
import { AlbunsComponent } from './components/albuns/albuns.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { EmitterService } from './services/emitter.service';
import { fakeBackendProvider } from '../app/_helpers';
import { AlertComponent } from './_directives/alert.component';
import { HomeComponent } from '../app/home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AlbunsComponent,
    AlbumViewComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimplesDentalModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    EmitterService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    // Para usar um fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
