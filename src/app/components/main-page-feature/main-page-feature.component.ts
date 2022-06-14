import {Component, OnInit} from '@angular/core';
import {ButtonCollectorModel, CollectorModel} from "../../utils";
import {UserDataAccessService} from "../user-data-access/user-data-access.service";
import {take} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {YesNoModalComponent} from "../../modals";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-page-feature',
  template: `
    <app-main-page-ui
      [collectors]="collectors"
      [buttonSelected]="buttonSelected"
      (deleteCollector)="deleteCollector($event)"
      (deleteButton)="deleteButton()"
    ></app-main-page-ui>
  `,
  styles: []
})
export class MainPageFeatureComponent implements OnInit {
  collectors: CollectorModel[] = [];
  id: string | null = null;
  buttonSelected = new FormControl(undefined);

  constructor(private userDataAccess: UserDataAccessService,
              private toastService: ToastrService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    if (this.id) {
      combineLatest([this.userDataAccess.getHeaderCollector(this.id), this.userDataAccess.getButtonsCollector(this.id)]).pipe(take(1)).subscribe(([hCollectors, bCollectors]) => {
        hCollectors.forEach((collector) =>{
          const bs: {key: string; value: ButtonCollectorModel}[] = [];
          bCollectors.forEach((button) =>{
            if(button.headerKey === collector.key){
              if(button.value){
                Object.entries(button.value).forEach((b) =>{
                  const but = {
                    key: b[0],
                    value: b[1]
                  };
                  bs.push(but);
                })
              }
            }
          })
          const col = {
            key: collector.key,
            buttons: bs,
            header: collector.value  
          }
          this.collectors.push(col);
        })
      });
      console.log(this.collectors);
    }
  }

  deleteCollector(key: string | null) {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.title = 'WARNING';
    modal.componentInstance.message = 'Are you sure you want to delete the collector?';
    modal.componentInstance.ccsCancelClass = 'btn-danger';
    modal.componentInstance.ccsConfirmClass = 'btn-success';
    modal.componentInstance.yesLabel = 'Yes';
    modal.componentInstance.noLabel = 'No';
    modal.result.then(() => {
      if (this.id && key) {
        this.userDataAccess.deleteCollector(this.id, key).then(() => {
          this.toastService.success('Collector removed successfully');
          this.collectors = [];
          this.ngOnInit();
        }).catch(() => {
          this.toastService.error('Error in removing the collector');
        });
      }
    }).catch(() => console.log(''));
  }

  deleteButton(){
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.title = 'WARNING';
    modal.componentInstance.message = 'Are you sure you want to delete the button?';
    modal.componentInstance.ccsCancelClass = 'btn-danger';
    modal.componentInstance.ccsConfirmClass = 'btn-success';
    modal.componentInstance.yesLabel = 'Yes';
    modal.componentInstance.noLabel = 'No';
    modal.result.then(() =>{
      if(this.id){
        const button: {key: string, value: ButtonCollectorModel}  = this.buttonSelected.value;
        this.userDataAccess.deleteButton(this.id, button.value.headerKey, button.key).then(() =>{
          this.toastService.success('Button removed successfully');
          this.collectors = [];
          this.ngOnInit();
        }).catch(() =>{
          this.toastService.error('Error in removing the button');
        })
      }
    }).catch(() => console.log(''));
  }

}
