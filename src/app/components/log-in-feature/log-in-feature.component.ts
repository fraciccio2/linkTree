import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-log-in-feature',
  template: `
    <app-log-in-ui
      [isHide]="true"
      [logInErrorMessage]="logInErrorMessage"
      [formLog]="formLog"
      [formControlNamePass]="formControlNamePass"
      [formControlNameUser]="formControlNameUser"
      (navigate)="navigate()"
      (logIn)="logIn()"
    ></app-log-in-ui>
  `,
  styles: []
})
export class LogInFeatureComponent {
  public formControlNameUser = 'user';
  private formControlUser = new FormControl(undefined, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  public formControlNamePass = 'password';
  private formControlPass = new FormControl(undefined, [Validators.required]);
  formLog = new FormGroup({
    [this.formControlNameUser]: this.formControlUser,
    [this.formControlNamePass]: this.formControlPass,
  })
  logInErrorMessage: string | undefined;

  constructor(private router: Router, private authService: AuthService) {
  }

  navigate(){
    this.router.navigate(['./sign-up']);
  }

  logIn(){
    const email = this.formLog.get([this.formControlNameUser])?.value;
    const password = this.formLog.get([this.formControlNamePass])?.value;
    this.authService.logIn(email, password).then(() =>{
      this.router.navigate(['./admin']).catch(console.error);
    }).catch((err) =>{
      switch (err.code){
        case 'auth/invalid-email': {
          this.logInErrorMessage = "Wrong email address";
          break;
        }
        case "auth/wrong-password": {
          this.logInErrorMessage = "Wrong password"
          break;
        }
        case 'auth/user-not-found': {
          this.logInErrorMessage = "Wrong email address and password";
          break;
        }
        default: {
          this.logInErrorMessage = "Unexpected Error";
          break;
        }
      }
    });
  }

}
