import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service/auth.service";
import {HttpClient} from '@angular/common/http'
import {UserDataAccessService} from "../user-data-access/user-data-access.service";

@Component({
  selector: 'app-sign-up-feature',
  template: `
    <app-sign-up-ui
      [isHide]="true"
      [formSign]="formSign"
      [formControlNameUser]="formControlNameUser"
      [formControlNamePass]="formControlNamePass"
      [formControlNameCheck]="formControlNameCheck"
      [formControlNameEmail]="formControlNameEmail"
      [termsAndConditions]="termsAndConditions"
      (navigate)="navigate()"
      (signIn)="signIn()"
    ></app-sign-up-ui>
  `,
  styles: []
})
export class SignUpFeatureComponent implements OnInit {
  public formControlNameUser = 'user';
  private formControlUser = new FormControl(undefined, [Validators.required]);
  public formControlNamePass = 'password';
  private formControlPass = new FormControl(undefined, [Validators.required]);
  public formControlNameEmail = 'email';
  private formControlEmail = new FormControl(undefined, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  public formControlNameCheck = 'check';
  private formControlCheck = new FormControl(undefined, [Validators.required]);
  formSign = new FormGroup({
    [this.formControlNameUser]: this.formControlUser,
    [this.formControlNamePass]: this.formControlPass,
    [this.formControlNameEmail]: this.formControlEmail,
    [this.formControlNameCheck]: this.formControlCheck,
  });
  termsAndConditions: Object | undefined;

  constructor(private router: Router,
              private authService: AuthService,
              private httpClient: HttpClient,
              private userDataAccess: UserDataAccessService) {
  }

  ngOnInit(): void {
    this.httpClient.get('assets/files/terms-and-conditions.txt', {responseType: 'text' as 'json'}).subscribe((data) =>{
      this.termsAndConditions = data;
    })
  }

  navigate() {
    this.router.navigate(['./log-in']).catch(console.error);
  }

  signIn() {
    const email = this.formSign.get([this.formControlNameEmail])?.value;
    const password = this.formSign.get([this.formControlNamePass])?.value;
    this.authService.signIn(email, password).then(() => {
      this.authService.user$.subscribe((user) =>{
        localStorage.setItem('userId', user.uid);
        this.userDataAccess.saveNickName(this.formSign.get(this.formControlNameUser)?.value);
      })
      this.router.navigate(['./admin']).catch(console.error);
    }).catch(console.error);
  }

}
