import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {UserDataAccessService} from "../user-data-access/user-data-access.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChangeImageModalComponent, ChangeUsernameModalComponent, YesNoModalComponent} from "../../modals";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DashboardItemModel} from "../../utils";
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-side-feature',
  template: `
    <app-dashboard-side-ui
      [nickname]="nickname"
      [userImage]="userImage"
      [dashboardItems]="dashboardItems"
      [sideActive]="userDataAccess.sideActive | async"
      (signOut)="signOut()"
      (changeUsername)="changeUsername()"
      (changeImage)="changeImage()"
      (removeImage)="removeImage()"
    ></app-dashboard-side-ui>
  `,
  styles: []
})
export class DashboardSideFeatureComponent implements OnInit {
  nickname: string | null = null;
  userImage: string | null = null;
  id: string | null | undefined;
  public formControlNameNickname = 'nickname';
  private formControlNickname = new FormControl('', Validators.required);
  formGroupNickname = new FormGroup({
    [this.formControlNameNickname]: this.formControlNickname
  });
  dashboardItems: DashboardItemModel[] = [
    {class: 'bi bi-house-door mr-3', text: 'Home', href: './admin'},
    {class: 'bi bi-plus-circle mr-3', text: 'New link', href: './new-link'},
    {class: 'bi bi-wrench-adjustable-circle mr-3', text: 'Customers', href: './options'}
  ];

  constructor(private authService: AuthService,
              public userDataAccess: UserDataAccessService,
              private modalService: NgbModal,
              private toastService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    if (this.id) {
      this.userDataAccess.getNickName(this.id).subscribe((nick) => {
        this.nickname = nick;
      });
      this.userDataAccess.getImageIcon(this.id).subscribe((icon) => {
        this.userImage = icon;
      });
    }
  }

  signOut() {
    this.authService.signOut().then(() =>{
      localStorage.removeItem('userId');
      this.router.navigate(['./log-in']);
    });
  }

  changeUsername() {
    const modal = this.modalService.open(ChangeUsernameModalComponent);
    this.formGroupNickname.reset();
    modal.componentInstance.formUser = this.formGroupNickname;
    modal.componentInstance.formControlNameNickname = this.formControlNameNickname;
    modal.result.then((resp: { formUser: FormGroup }) => {
      if (this.id) {
        this.userDataAccess.changeNickName(this.id, resp.formUser.get(this.formControlNameNickname)?.value).then(() => {
          this.toastService.success('Username update with success');
          this.ngOnInit();
        }).catch(() => {
          this.toastService.error("Error in the username's modify");
        });
      }
    }).catch(() => console.log(''));
  }

  changeImage() {
    const modal = this.modalService.open(ChangeImageModalComponent);
    modal.result.then((resp: { fileToSave: File }) => {
      this.userDataAccess.saveImageIconOnStore(resp.fileToSave).then((percent) => {
        if (percent.bytesTransferred === percent.totalBytes) {
          const fileRef = this.userDataAccess.url(resp.fileToSave.name);
          fileRef.getDownloadURL().subscribe((url) => {
            this.userImage = url;
            if (this.id) {
              this.userDataAccess.saveImageIconOnDataBase(this.id, url).then(() => {
                this.toastService.success('Image update with success');
                this.ngOnInit();
              }).catch(() => {
                this.toastService.error("Error in the image's update");
              });
            }
          })
        }
      })
    }).catch(() => console.log(''));
  }

  removeImage() {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.title = 'WARNING';
    modal.componentInstance.message = 'Are you sure you want to delete the image?';
    modal.componentInstance.ccsCancelClass = 'btn-danger';
    modal.componentInstance.ccsConfirmClass = 'btn-success';
    modal.componentInstance.yesLabel = 'Yes';
    modal.componentInstance.noLabel = 'No';
    modal.result.then(() => {
      if (this.id) {
        this.userDataAccess.removeImageFromDatabase(this.id).then(() => {
          this.toastService.success('Image remove with success');
          this.ngOnInit();
        }).catch(() => {
          this.toastService.error("Error on remove the image");
        })
      }
    }).catch(() => console.log(''));
  }

}
