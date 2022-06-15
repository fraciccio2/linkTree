import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarUiComponent} from "./components/navbar-ui/navbar-ui.component";
import {LogInFeatureComponent} from './components/log-in-feature/log-in-feature.component';
import {LogInUiComponent} from './components/log-in-ui/log-in-ui.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SignUpUiComponent} from './components/sign-up-ui/sign-up-ui.component';
import {SignUpFeatureComponent} from './components/sign-up-feature/sign-up-feature.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MainPageUiComponent} from './components/main-page-ui/main-page-ui.component';
import {DashboardSideUiComponent} from './components/dashboard-side-ui/dashboard-side-ui.component';
import {DashboardSideFeatureComponent} from './components/dashboard-side-feature/dashboard-side-feature.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChangeImageModalComponent, ChangeUsernameModalComponent, YesNoModalComponent} from './modals';
import {ToastrModule} from "ngx-toastr";
import {MainPageFeatureComponent} from './components/main-page-feature/main-page-feature.component';
import {AddNewLinkPageUiComponent} from './components/add-new-link-page-ui/add-new-link-page-ui.component';
import {
  AddNewLinkPageFeatureComponent
} from './components/add-new-link-page-feature/add-new-link-page-feature.component';
import {CardOptionsUiComponent} from './components/card-options-ui/card-options-ui.component';
import {MatMenuModule} from "@angular/material/menu";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HomePageUiComponent} from './components/home-page-ui/home-page-ui.component';
import {HomePageFeatureComponent} from './components/home-page-feature/home-page-feature.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUiComponent,
    LogInFeatureComponent,
    LogInUiComponent,
    SignUpUiComponent,
    SignUpFeatureComponent,
    MainPageUiComponent,
    DashboardSideUiComponent,
    DashboardSideFeatureComponent,
    ChangeUsernameModalComponent,
    ChangeImageModalComponent,
    YesNoModalComponent,
    MainPageFeatureComponent,
    AddNewLinkPageUiComponent,
    AddNewLinkPageFeatureComponent,
    CardOptionsUiComponent,
    HomePageUiComponent,
    HomePageFeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    MatMenuModule,
    DragDropModule
  ],
  providers: [HttpClientModule, NgbCarouselConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
