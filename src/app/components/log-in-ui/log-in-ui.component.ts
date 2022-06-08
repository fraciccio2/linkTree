import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-log-in-ui',
  templateUrl: './log-in-ui.component.html',
  styleUrls: ['./log-in-ui.component.css']
})
export class LogInUiComponent {
  @Input() isHide: boolean | undefined;
  @Input() logInErrorMessage: string | undefined;
  @Input() formLog: FormGroup | undefined;
  @Input() formControlNameUser: string | null = null;
  @Input() formControlNamePass: string | null = null;
  @Output() navigate = new EventEmitter<void>();
  @Output() logIn = new EventEmitter<void>();

}
