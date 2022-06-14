import {Component, OnInit} from '@angular/core';
import {ButtonCollectorModel, CollectorModel, HeaderCollectorModel} from "../../utils";
import {UserDataAccessService} from "../user-data-access/user-data-access.service";
import {map, take} from "rxjs/operators";
import {combineLatest} from "rxjs";
import {forEach} from "lodash-es";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {YesNoModalComponent} from "../../modals";

@Component({
  selector: 'app-main-page-feature',
  template: `
    <app-main-page-ui
      [collectors]="collectors"
      (deleteCollector)="deleteCollector($event)"
    ></app-main-page-ui>
  `,
  styles: []
})
export class MainPageFeatureComponent implements OnInit {
  collectors: CollectorModel[] = [];
  id: string | null = null;

  constructor(private userDataAccess: UserDataAccessService,
              private toastService: ToastrService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    if (this.id) {
      const headerKeyCollectors = this.userDataAccess.getHeaderCollector(this.id).pipe(map((collectors) => {
        return collectors.map((collector) => {
          const key = collector.payload.key;
          const data = collector.payload.val() as HeaderCollectorModel;
          return {key, data};
        })
      }));
      combineLatest([headerKeyCollectors, this.userDataAccess.getButtonsCollector(this.id)]).pipe(take(1)).subscribe(([hCollectors, bCollectors]) => {
        hCollectors.forEach((collector) => {
          const bs: ButtonCollectorModel["data"][] = [];
          forEach(bCollectors[0], (button) => {
            if (collector.key === button.headerKey) {
              bs.push(button.data);
            }
          })
          const c: CollectorModel = {
            header: collector.data,
            buttons: bs,
            key: collector.key
          };
          this.collectors.push(c);
        })
        console.log(this.collectors);
      });
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

}
