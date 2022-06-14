import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDataAccessService} from "../user-data-access/user-data-access.service";
import {ToastrService} from "ngx-toastr";
import {map} from 'rxjs/operators';
import {ButtonCollectorModel, HeaderCollectorModel} from "../../utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-new-link-page-feature',
  template: `
    <app-add-new-link-page-ui
      [showHeaderPreview]="showHeaderPreview"
      [showButtonPreview]="showButtonPreview"
      [formHeaderCollector]="formHeaderCollector"
      [formButtonCollector]="formButtonCollector"
      [formControlNameBackgroundColor]="formControlNameBackgroundColor"
      [formControlNameTextColor]="formControlNameTextColor"
      [formControlNameCollector]="formControlNameCollector"
      [formControlNameSize]="formControlNameSize"
      [formControlNameAlign]="formControlNameAlign"
      [formControlNameLink]="formControlNameLink"
      [formControlNameKeyCollector]="formControlNameKeyCollector"
      [textHeaderSizes]="textHeaderSizes"
      [textButtonSizes]="textButtonSizes"
      [collectors]="collectors"
      (changeShowPreview)="changeShowPreview($event)"
      (saveHeaderCollector)="saveHeaderCollector()"
      (saveButtonCollector)="saveButtonCollector()"
    ></app-add-new-link-page-ui>
  `,
  styles: []
})
export class AddNewLinkPageFeatureComponent implements OnInit {
  showHeaderPreview = true;
  showButtonPreview = true;
  id: string | null = null;
  public formControlNameCollector = 'name';
  private formControlHCollector = new FormControl('Example', [Validators.required, Validators.maxLength(35)]);
  private formControlBCollector = new FormControl('Example', [Validators.required, Validators.maxLength(35)]);
  public formControlNameBackgroundColor = 'bColor';
  private formControlHBackgroundColor = new FormControl('#F7F7F7');
  private formControlBBackgroundColor = new FormControl('#FFFFFF');
  public formControlNameTextColor = 'tColor';
  private formControlHTextColor = new FormControl('#000');
  private formControlBTextColor = new FormControl('#000');
  public formControlNameSize = 'size';
  private formControlHSize = new FormControl('16px');
  private formControlBSize = new FormControl('14px');
  public formControlNameAlign = 'align';
  private formControlHAlign = new FormControl('center');
  private formControlBAlign = new FormControl('left');
  public formControlNameLink = 'link';
  private formControlLink = new FormControl(undefined, Validators.required);
  public formControlNameKeyCollector = 'keyCollector';
  private formControlKeyCollector = new FormControl('', [Validators.required]);
  formHeaderCollector = new FormGroup({
    [this.formControlNameCollector]: this.formControlHCollector,
    [this.formControlNameBackgroundColor]: this.formControlHBackgroundColor,
    [this.formControlNameTextColor]: this.formControlHTextColor,
    [this.formControlNameSize]: this.formControlHSize,
    [this.formControlNameAlign]: this.formControlHAlign,
  });
  formButtonCollector = new FormGroup({
    [this.formControlNameCollector]: this.formControlBCollector,
    [this.formControlNameBackgroundColor]: this.formControlBBackgroundColor,
    [this.formControlNameTextColor]: this.formControlBTextColor,
    [this.formControlNameSize]: this.formControlBSize,
    [this.formControlNameAlign]: this.formControlBAlign,
    [this.formControlNameLink]: this.formControlLink,
    [this.formControlNameKeyCollector]: this.formControlKeyCollector,
  });
  textHeaderSizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px'];
  textButtonSizes = ['12px', '14px', '16px', '18px', '20px', '22px'];
  collectors: { value: HeaderCollectorModel, key: string | null }[] | undefined;

  constructor(private userDataAccess: UserDataAccessService,
              private toastService: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('userId');
    if(this.id){
      this.userDataAccess.getHeaderCollector(this.id).subscribe((collectors) => {
        this.collectors = collectors;
      });
    }
  }

  changeShowPreview(preview: boolean) {
    preview = !preview;
  }

  saveHeaderCollector() {
    const collector: HeaderCollectorModel = {
      name: this.formHeaderCollector.get(this.formControlNameCollector)?.value,
      value: {
        background_color: this.formHeaderCollector.get(this.formControlNameBackgroundColor)?.value,
        text_color: this.formHeaderCollector.get(this.formControlNameTextColor)?.value,
        text_size: this.formHeaderCollector.get(this.formControlNameSize)?.value,
        align: this.formHeaderCollector.get(this.formControlNameAlign)?.value
      }
    }
    if (this.id) {
      this.userDataAccess.saveHeaderCollector(collector, this.id).then(() => {
        this.toastService.success('Collector save with success');
        this.router.navigate(['./admin']).catch(console.error);
      }).catch(() => {
        this.toastService.error('Error');
      });
    }
  }

  saveButtonCollector() {
    const collector: ButtonCollectorModel = {
      headerKey: this.formButtonCollector.get(this.formControlNameKeyCollector)?.value,
      data: {
        name: this.formButtonCollector.get(this.formControlNameCollector)?.value,
        link: this.formButtonCollector.get(this.formControlNameLink)?.value,
        value: {
          background_color: this.formButtonCollector.get(this.formControlNameBackgroundColor)?.value,
          text_color: this.formButtonCollector.get(this.formControlNameTextColor)?.value,
          text_size: this.formButtonCollector.get(this.formControlNameSize)?.value,
          align: this.formButtonCollector.get(this.formControlNameAlign)?.value
        }
      }
    }
    if (this.id) {
      this.userDataAccess.saveButtonCollector(this.id, collector.headerKey, collector).then(() => {
        this.toastService.success('Button save with success');
        this.router.navigate(['./admin']).catch(console.error);
      }).catch(() => {
        this.toastService.error('Error');
      });
    }
  }

}
