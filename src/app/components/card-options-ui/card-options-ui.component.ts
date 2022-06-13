import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card-options-ui',
  templateUrl: './card-options-ui.component.html',
  styleUrls: ['./card-options-ui.component.css']
})
export class CardOptionsUiComponent {
  @Input() showPreview: boolean | undefined;
  @Input() formCollector: FormGroup | undefined;
  @Input() formControlNameCollector: string | null = null;
  @Input() formControlNameBackgroundColor: string | null = null;
  @Input() formControlNameTextColor: string | null = null;
  @Input() formControlNameSize: string | null = null;
  @Input() formControlNameAlign: string | null = null;
  @Input() textSizes: string[] | undefined;

}
