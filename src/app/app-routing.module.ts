import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInFeatureComponent} from "./components/log-in-feature/log-in-feature.component";
import {SignUpFeatureComponent} from "./components/sign-up-feature/sign-up-feature.component";
import {NavbarFeatureComponent} from "./components/navbar-feature/navbar-feature.component";
import { MainPageUiComponent } from './components/main-page-ui/main-page-ui.component';

const routes: Routes = [
  {
    path: 'log-in', component: LogInFeatureComponent
  },
  {
    path: 'sign-up', component: SignUpFeatureComponent
  },
  {
    path: '', component: NavbarFeatureComponent
  },
  {
    path: 'admin', component: MainPageUiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
