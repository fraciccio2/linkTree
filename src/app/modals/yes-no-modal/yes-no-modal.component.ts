import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-yes-no-modal',
  template: `
    <div class="modal-content rounded-3 shadow">
      <div class="modal-body p-4 text-center">
        <h5 class="mb-0" [innerHTML]="title"></h5>
        <p class="mb-0" [innerHTML]="message"></p>
      </div>
      <div class="modal-footer flex-nowrap p-0">
        <button (click)="confirm()" type="button"
                class="btn btn-lg fs-6 text-decoration-none col-6 m-0 rounded-0 border-end" [class]="ccsConfirmClass">
          <strong>{{yesLabel}}</strong></button>
        <button (click)="cancel()" type="button" class="btn btn-lg fs-6 text-decoration-none col-6 m-0 rounded-0"
                [class]="ccsCancelClass">{{noLabel}}</button>
      </div>
    </div>

  `,
  styles: []
})
export class YesNoModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() yesLabel = 'Yes, enable';
  @Input() noLabel = 'No thanks';
  @Input() ccsCancelClass = 'btn-link';
  @Input() ccsConfirmClass = 'btn-link';

  constructor(public modal: NgbActiveModal) {
  }

  cancel() {
    this.modal.dismiss();
  }

  confirm() {
    this.modal.close();
  }

}
