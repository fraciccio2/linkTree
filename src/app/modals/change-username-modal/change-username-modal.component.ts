import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-change-username-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Enter a new username</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="dismiss()"></button>
    </div>
    <div class="modal-body">
      <form [formGroup]="formUser" *ngIf="formUser">
        <div class="mb-3 form-group">
          <label for="dateOfBirth">Choose a new username</label>
          <input class="form-control" [formControlName]="formControlNameNickname">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="close()">Change my username</button>
    </div>
  `,
  styles: []
})
export class ChangeUsernameModalComponent {
  @Input() formUser: FormGroup | undefined;
  @Input() formControlNameNickname: string | null = null;

  constructor(private modalService: NgbActiveModal) {
  }

  close() {
    this.modalService.close({formUser: this.formUser});
  }

  dismiss() {
    this.modalService.dismiss();
  }

}
