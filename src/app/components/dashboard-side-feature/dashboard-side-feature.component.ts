import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {AuthService} from "../../services/auth-service/auth.service";
import {UserDataAccessService} from "../user-data-access/user-data-access.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChangeUsernameModalComponent} from "../../modals/change-username-modal/change-username-modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ChangeImageModalComponent} from "../../modals/change-image-modal/change-image-modal.component";

@Component({
  selector: 'app-dashboard-side-feature',
  template: `
    <app-dashboard-side-ui
      [isHide]="isHide"
      [nickname]="nickname"
      [userImage]="userImage"
      (signOut)="signOut()"
      (changeUsername)="changeUsername()"
      (changeImage)="changeImage()"
    ></app-dashboard-side-ui>
  `,
  styles: []
})
export class DashboardSideFeatureComponent implements OnInit {
  isHide: boolean | undefined;
  nickname: string | null = null;
  userImage: string | undefined;
  id: string | null | undefined;
  public formControlNameNickname = 'nickname';
  private formControlNickname = new FormControl('', Validators.required);
  formGroupNickname = new FormGroup({
    [this.formControlNameNickname]: this.formControlNickname
  });

  constructor(private router: Router,
              private authService: AuthService,
              private userDataAccess: UserDataAccessService,
              private modalService: NgbModal,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val: any) => {
      this.isHide = !!(val.url.includes('/home') || val.url.includes('/log-in') || val.url.includes('/sign-up'));
      if (this.id) {
        this.userDataAccess.getNickName(this.id).subscribe((nick) => {
          this.nickname = nick;
        })
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }

  changeUsername() {
    const modal = this.modalService.open(ChangeUsernameModalComponent);
    this.formGroupNickname.reset();
    modal.componentInstance.formUser = this.formGroupNickname;
    modal.componentInstance.formControlNameNickname = this.formControlNameNickname;
    modal.result.then((resp: {formGroup: FormGroup}) =>{
      const id = localStorage.getItem('userId');
      if(id){
        this.userDataAccess.changeNickName(id, resp.formGroup.get(this.formControlNameNickname)?.value).then(() =>{
          this.toastService.success('Username aggiornato con successo');
          this.ngOnInit();
        }).catch(() =>{
          this.toastService.error("Errore nella modifica dell'username");
        });
      }
    }).catch(() => console.log(''));
  }

  changeImage(){
    const modal = this.modalService.open(ChangeImageModalComponent);
    modal.result.then((resp: {file: File}) =>{
      this.userDataAccess.saveImageIconOnStore(resp.file).then((percent) =>{
        if(percent.bytesTransferred === percent.totalBytes){
          const fileRef = this.userDataAccess.url(resp.file.name);
          fileRef.getDownloadURL().subscribe((url) =>{
            this.userImage = url;
            if(this.id){
              this.userDataAccess.saveImageIconOnDataBase(this.id, url);
              this.ngOnInit();
            }
          })
        }
      })
    }).catch(() => console.log(''));
  }

}
