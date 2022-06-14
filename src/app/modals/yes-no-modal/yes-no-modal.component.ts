import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-yes-no-modal',
  template: `
    <div class="modal-header">
      <h4 [innerHTML]="title" class="modal-title text-danger" id="modal-title"></h4>
    </div>

    <div class="modal-body">
      <p [innerHTML]="message"></p>
    </div>

    <div class="modal-footer">
      <button
        (click)="cancel()"
        [class]="ccsCancelClass"
        class="btn cursor-pointer text-uppercase"
        type="button"
      >
        {{ noLabel }}
      </button>
      <button
        (click)="confirm()"
        [class]="ccsConfirmClass"
        class="btn cursor-pointer text-uppercase"
        type="button"
      >
        {{ yesLabel }}
      </button>
    </div>

  `,
  styles: []
})
export class YesNoModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() yesLabel = 'Sì';
  @Input() noLabel = 'No';
  @Input() ccsCancelClass = 'btn-secondary';
  @Input() ccsConfirmClass = 'btn-primary';

  constructor(public modal: NgbActiveModal) {
  }

  cancel() {
    this.modal.dismiss();
  }

  confirm() {
    this.modal.close();
  }

}
