import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-change-image-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Enter a new profile's image</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="dismiss()"></button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-3 form-group">
          <label for="dateOfBirth">Choose a new profile's image</label>
          <input type="file" hidden (change)="fileSelected($event)" #fileInput accept=".png, .jpeg, .jpg">
          <div class="input-group mt-3">
            <input type="text" class="form-control" (click)="fileInput.click()">
            <button type="button" class="btn btn-secondary" (click)="fileInput.click()">
              <i class="bi bi-paperclip"></i>
            </button>
          </div>
        </div>
      </form>
      <img [src]="photo" *ngIf="photo" alt="" width="50%" height="50%" class="center-img">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="close()">Change my profiles's image</button>
    </div>
  `,
  styles: []
})
export class ChangeImageModalComponent {
  photo: string | ArrayBuffer | null | undefined;
  fileToSave: File | undefined;

  constructor(private modalService: NgbActiveModal) {
  }

  close() {
    this.modalService.close({fileToSave: this.fileToSave});
  }

  dismiss() {
    this.modalService.dismiss();
  }

  fileSelected(event: any) {
    this.fileToSave = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (data) => this.photo = data.target?.result;
  }

}
