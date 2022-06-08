import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarFeatureComponent } from './components/navbar-feature/navbar-feature.component';
import { NavbarUiComponent } from "./components/navbar-ui/navbar-ui.component";
import { LogInFeatureComponent } from './components/log-in-feature/log-in-feature.component';
import { LogInUiComponent } from './components/log-in-ui/log-in-ui.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SignUpUiComponent } from './components/sign-up-ui/sign-up-ui.component';
import { SignUpFeatureComponent } from './components/sign-up-feature/sign-up-feature.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { MainPageUiComponent } from './components/main-page-ui/main-page-ui.component';
import { DashboardSideUiComponent } from './components/dashboard-side-ui/dashboard-side-ui.component';
import { DashboardSideFeatureComponent } from './components/dashboard-side-feature/dashboard-side-feature.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarFeatureComponent,
    NavbarUiComponent,
    LogInFeatureComponent,
    LogInUiComponent,
    SignUpUiComponent,
    SignUpFeatureComponent,
    MainPageUiComponent,
    DashboardSideUiComponent,
    DashboardSideFeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
