import {Component, OnInit} from '@angular/core';
import {ButtonCollectorModel, CollectorModel} from "../../utils";
import {UserDataAccessService} from "../user-data-access/user-data-access.service";
import {take} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {YesNoModalComponent} from "../../modals";
import {FormControl} from '@angular/forms';
import {Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {orderBy} from "lodash-es";

@Component({
  selector: 'app-main-page-feature',
  template: `
    <app-main-page-ui
      [collectors]="collectors"
      [buttonSelected]="buttonSelected"
      (deleteCollector)="deleteCollector($event)"
      (deleteButton)="deleteButton()"
      (modifyButton)="modifyButton()"
      (drop)="drop($event)"
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
              private modalService: NgbModal,
              private router: Router) {
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
            buttons: orderBy(bs, 'value.ordering'),
            header: collector.value
          }
          this.collectors.push(col);
        })
      });
      console.log(this.collectors);
    }
  }

  deleteCollector(key: string | null) {
    const modal = this.modalService.open(YesNoModalComponent, {centered: true});
    modal.componentInstance.title = 'WARNING';
    modal.componentInstance.message = 'Are you sure you want to delete the collector?';
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
    const modal = this.modalService.open(YesNoModalComponent, {centered: true});
    modal.componentInstance.title = 'WARNING';
    modal.componentInstance.message = 'Are you sure you want to delete the button?';
    modal.result.then(() =>{
      if(this.id){
        const button: {key: string, value: ButtonCollectorModel}  = this.buttonSelected.value;
        this.userDataAccess.deleteButton(this.id, button.value.headerKey, button.key).then(() => {
          this.toastService.success('Button removed successfully');
          this.collectors = [];
          this.ngOnInit();
        }).catch(() => {
          this.toastService.error('Error in removing the button');
        })
      }
    }).catch(() => console.log(''));
  }

  modifyButton() {
    const bKey = this.buttonSelected.value.key;
    const hKey = this.buttonSelected.value.value.headerKey;
    this.router.navigate(['../new-link/button/' + bKey], {queryParams: {hKey}}).catch(console.error);
  }

  drop(event: CdkDragDrop<{ key: string; value: ButtonCollectorModel }[]>) {
    if (event.currentIndex !== event.previousIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const list = event.container.data;
      const newButtonsList: { [key: string]: ButtonCollectorModel } = {};
      const hKey = list[0].value.headerKey;
      list.forEach((button, index) => {
        button.value.ordering = index;
        newButtonsList[button.key] = button.value;
      });
      if (this.id) {
        this.userDataAccess.moveButton(this.id, hKey, newButtonsList).then(() => {
          this.toastService.success('Button move successfully');
        }).catch(() => {
          this.toastService.error('Error');
        })
      }
    }
  }

}
