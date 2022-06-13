import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-new-link-page-ui',
  templateUrl: './add-new-link-page-ui.component.html',
  styleUrls: ['./add-new-link-page-ui.component.css']
})
export class AddNewLinkPageUiComponent {
  @Input() active: number | undefined;
  @Input() showPreview: boolean | undefined;
  @Input() formHeaderCollector: FormGroup | undefined;
  @Input() formButtonCollector: FormGroup | undefined;
  @Input() formControlNameCollector: string | null = null;
  @Input() formControlNameBackgroundColor: string | null = null;
  @Input() formControlNameTextColor: string | null = null;
  @Input() formControlNameSize: string | null = null;
  @Input() formControlNameAlign: string | null = null;
  @Input() formControlNameLink: string | null = null;
  @Input() textHeaderSizes: string[] | undefined;
  @Input() textButtonSizes: string[] | undefined;
  @Output() changeShowPreview = new EventEmitter<void>();
  @Output() saveHeaderCollector = new EventEmitter<void>();
  @Output() saveButtonCollector = new EventEmitter<void>();

}
