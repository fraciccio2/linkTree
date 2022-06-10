import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-new-link-page-ui',
  templateUrl: './add-new-link-page-ui.component.html',
  styleUrls: ['./add-new-link-page-ui.component.css']
})
export class AddNewLinkPageUiComponent implements OnInit {
  @Input() active: number | undefined;
  @Input() formCollector: FormGroup | undefined;
  @Input() formControlNameCollector: string | null = null;
  @Input() formControlNameBackgroundColor: string | null = null;
  @Input() formControlNameTextColor: string | null = null;
  @Input() formControlNameSize: string | null = null;
  @Input() formControlNameAlign: string | null = null;
  @Input() textSizes: string[] | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
