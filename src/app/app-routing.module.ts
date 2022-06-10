import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInFeatureComponent} from "./components/log-in-feature/log-in-feature.component";
import {SignUpFeatureComponent} from "./components/sign-up-feature/sign-up-feature.component";
import {NavbarFeatureComponent} from "./components/navbar-feature/navbar-feature.component";
import {AuthLogInGuard} from "./guards/auth-log-in/auth-log-in.guard";
import {LoggedUserGuard} from "./guards/logged-user/logged-user.guard";
import {MainPageFeatureComponent} from "./components/main-page-feature/main-page-feature.component";
import {
  AddNewLinkPageFeatureComponent
} from "./components/add-new-link-page-feature/add-new-link-page-feature.component";

const routes: Routes = [
  {
    path: 'log-in', component: LogInFeatureComponent, canActivate: [LoggedUserGuard]
  },
  {
    path: 'sign-up', component: SignUpFeatureComponent, canActivate: [LoggedUserGuard]
  },
  {
    path: 'home', component: NavbarFeatureComponent
  },
  {
    path: 'admin', component: MainPageFeatureComponent, canActivate: [AuthLogInGuard]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'new-link', component: AddNewLinkPageFeatureComponent, canActivate: [AuthLogInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
