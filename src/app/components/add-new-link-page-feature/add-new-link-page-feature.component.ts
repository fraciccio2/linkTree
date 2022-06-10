import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-new-link-page-feature',
  template: `
    <app-add-new-link-page-ui
      [formCollector]="formCollector"
      [formControlNameBackgroundColor]="formControlNameBackgroundColor"
      [formControlNameTextColor]="formControlNameTextColor"
      [formControlNameCollector]="formControlNameCollector"
      [formControlNameSize]="formControlNameSize"
      [formControlNameAlign]="formControlNameAlign"
      [textSizes]="textSizes"
    ></app-add-new-link-page-ui>
  `,
  styles: []
})
export class AddNewLinkPageFeatureComponent implements OnInit {
  public formControlNameCollector = 'name';
  private formControlCollector = new FormControl('Example', [Validators.required, Validators.maxLength(35)]);
  public formControlNameBackgroundColor = 'bColor';
  private formControlBackgroundColor = new FormControl('#F7F7F7');
  public formControlNameTextColor = 'tColor';
  private formControlTextColor = new FormControl('#000');
  public formControlNameSize = 'size';
  private formControlSize = new FormControl('16px');
  public formControlNameAlign = 'align';
  private formControlAlign = new FormControl('center');
  formCollector = new FormGroup({
    [this.formControlNameCollector]: this.formControlCollector,
    [this.formControlNameBackgroundColor]: this.formControlBackgroundColor,
    [this.formControlNameTextColor]: this.formControlTextColor,
    [this.formControlNameSize]: this.formControlSize,
    [this.formControlNameAlign]: this.formControlAlign,
  });
  textSizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
