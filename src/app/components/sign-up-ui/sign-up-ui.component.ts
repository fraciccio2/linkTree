import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up-ui',
  templateUrl: './sign-up-ui.component.html',
  styleUrls: ['./sign-up-ui.component.css']
})
export class SignUpUiComponent {
  @Input() isHide: boolean | undefined;
  @Input() formSign: FormGroup | undefined;
  @Input() formControlNameUser: string | null = null;
  @Input() formControlNameEmail: string | null = null;
  @Input() formControlNamePass: string | null = null;
  @Input() formControlNameCheck: string | null = null;
  @Input() termsAndConditions: Object | undefined;
  @Output() navigate = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<void>();

}
